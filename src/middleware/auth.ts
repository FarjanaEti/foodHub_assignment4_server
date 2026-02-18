import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth'
import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
}


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
        providerProfile?: {
          id: string | undefined;
        };
      }
    }
  }
}

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            // get user session
           const headers = fromNodeHeaders(req.headers);
         

      const session = await betterAuth.api.getSession({
        headers,   
      });
          
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized!"
                })
            }
            

            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verification required. Please verify your email!"
                })
            }

            const user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as UserRole,
                emailVerified: session.user.emailVerified,
                providerProfile: undefined as { id: string } | undefined,
            }


      
      if (user.role === UserRole.PROVIDER) {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (profile) {
    user.providerProfile = { id: profile.id };
  }
}

      req.user = user;
       
            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You don't have permission to access this resources!"
                })
            }

            next()
        } catch (err) {
            next(err);
        }

    }
};

export default auth;