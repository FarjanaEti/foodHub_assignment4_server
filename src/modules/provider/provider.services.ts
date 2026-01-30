
import { ProviderProfile } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";


type CreateProviderInput = Omit<
  ProviderProfile,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export const createProviderProfile = async (
  data: CreateProviderInput,
  userId: string
) => {
 
  const existingProvider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existingProvider) {
    throw new Error("Provider profile already exists for this user");
  }

 
  const result = await prisma.providerProfile.create({
    data: {
      ...data,
      userId,
    },
  });

  return result;
};

export const providerService = {
          createProviderProfile                    
}
  
