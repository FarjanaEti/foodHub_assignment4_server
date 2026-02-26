
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";


type CreateMealInput = {
  title: string;
  description?: string;
  price: number;
  categoryId: string;
  cuisine: string;
  dietType: string;
  image?: string;
};

const createMeal = async (
  providerId: string,
  data: CreateMealInput
) => {
  //  category must exist & be active
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      isActive: true,
    },
  });

  if (!category) {
    throw new Error("Invalid or inactive category");
  }

  //  provider must exist
  const providerExists = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!providerExists) {
    throw new Error("Provider profile not found");
  }

  
  return prisma.meal.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim(),
      price: data.price,
      categoryId: data.categoryId,
      cuisine: data.cuisine,
      dietType: data.dietType,
      image: data.image,
      providerId,
      available: true, 
    },
  });
};



//get all meal
type GetAllMealsParams = {
  search?: string;
  categoryId?: string;
  providerId?: string;
  cuisine?: string;
  dietType?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
};

const getAllMeals = async (params: GetAllMealsParams) => {
  const {
    search,
    categoryId,
    providerId,
    cuisine,
    dietType,
    minPrice,
    maxPrice,
    available,
  } = params;

  const where: any = {};

  // Text search 
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  //  Filters
  if (categoryId) where.categoryId = categoryId;
  if (providerId) where.providerId = providerId;
  if (typeof available === "boolean") where.available = available;
  if (cuisine) where.cuisine = cuisine;
  if (dietType) where.dietType = dietType;

  //  Price  filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  return prisma.meal.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      provider: true,
    },
  });
};


//logged provider get only his own meal not all other provider meal
const getMyMeals = async (
  providerId: string,
  query: any
) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    providerId, 
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const meals = await prisma.meal.findMany({
    where,
    skip,
    take: Number(limit),
    orderBy: { [sortBy]: sortOrder },
    include: {
      category: { select: { id: true, name: true } },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          order: {
            select: {
              id: true,
              status: true,
              createdAt: true,
            },
          },
        },
      },
      _count: { select: { reviews: true } },
    },
  });

  const total = await prisma.meal.count({ where });

  return {
    data: meals,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

//get meal by id
const getMealById = async (id: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  return meal;
};
//provider update their meal
const updateMeal = async (
  id: string,
  payload: { title?: string; price?: number; available?: boolean }
) => {
  const meal = await prisma.meal.findUnique({ where: { id } });

  if (!meal) {
    throw new Error("Meal not found");
  }

  return prisma.meal.update({
    where: { id },
    data: {
      title: payload.title ?? meal.title,
      price: payload.price ?? meal.price,
      available: payload.available ?? meal.available,
    },
  });
};
//provider delete a meal
const deleteMeal = async (mealId: string, id: string) => {
  
  const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId: id },
        select: { id: true }
    });

    if (!providerProfile) {
        throw new Error("Provider profile not found!");
    }

    const orderCount = await prisma.orderItem.count({
  where: { mealId }
});

if (orderCount > 0) {
  return {
    status: 409,
    message: "This meal cannot be deleted because it already has orders."
  };
}

  const mealData = await prisma.meal.findFirst({
        where: {
            id: mealId,
            providerId: providerProfile.id
        },
        select: {
            id: true
        }
    })

    if (!mealData) {
        throw new Error("Your provided input is invalid!")
    }

    return await prisma.meal.delete({
        where: {
            id: mealData.id
        }
    })
}

export const mealService = {
    createMeal,
    getAllMeals,
    getMyMeals,
    getMealById,
    updateMeal,
    deleteMeal
}