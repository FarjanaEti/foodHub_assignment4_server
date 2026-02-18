
import { ProviderProfile } from "../../../generated/prisma/browser";
import { ProviderProfileWhereInput } from "../../../generated/prisma/models";
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

//get all provider
interface GetAllProvidersParams {
  search?: string;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

const getAllProviders = async ({
  search,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: GetAllProvidersParams) => {
  const andConditions: ProviderProfileWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          restaurantName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
          },
        },
      ],
    });
  }

  const providers = await prisma.providerProfile.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      meals:{
        select:{
          id:true,
          available:true,
          createdAt:true,
          image:true,
          description:true,
          price:true,
          title:true
        }
      },
      _count: {
        select: {
          meals: true,
          orders: true,
        },
      },
    },
  });

  const total = await prisma.providerProfile.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: providers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
//get provider by id with menu
const getProviderById=async(id:string)=>{
   const provider=await prisma.providerProfile.findUnique({
      where:{id},
      include:{
        meals:{
        select:{
        id: true,
        title: true,
        price: true,
        image: true,
        available: true,
          }
        }
      }
   })

   if(!provider){
    throw new Error("Provider not found")
   }

   return provider;
}

 const deleteProvider = async (providerId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!providerProfile) {
    throw new Error("Provider not found!");
  }

  return await prisma.providerProfile.delete({
    where: { id: providerId },
  });
};



export const providerService = {
          createProviderProfile,
          getAllProviders,
          getProviderById,
          deleteProvider                    
}
  
