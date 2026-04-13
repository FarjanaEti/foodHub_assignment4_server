import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});
//localhost
const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, {
    provider: "postgresql", 
  }),
  
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://assignment4-client-lilac.vercel.app",
    "https://*.vercel.app",
    "http://localhost:3000"
  ],

  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      attributes: {
        httpOnly: true,
        // sameSite: "none",
        // secure: true,
         sameSite: isProduction ? "none" : "lax",  
        secure: isProduction,
        path: "/",
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    expiresIn: 60 * 60 * 24 * 7, 
  },

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true, 
  },

  user: {
 
    fields: {
    emailVerified: "emailVerified",
        },

    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      
    }
  },

  

  emailAndPassword: { 
    enabled: true, 
    autoSignIn: false,
    requireEmailVerification: false
  }, 

   emailVerification: {
        sendOnSignUp: false,
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                  console.log("Creating user, forcing emailVerified to true...")
                    return {
                        data: {
                            ...user,
                            emailVerified: true,
                        },
                    };
                },
            },
        },
    },

  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "profile", "openid"],
      skipStateCookieCheck: true,
      redirectURI: "https://assignment4-backend-red.vercel.app/api/auth/callback/google",
      
    },
  },
  
});