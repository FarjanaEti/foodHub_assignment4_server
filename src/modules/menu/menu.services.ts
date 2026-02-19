
import { Meal } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

type CreateMealInput = Omit<Meal, 'id' | 'createdAt' | 'updatedAt' | 'providerId' | 'available'>;

const createMeal = async (
  providerId: string,
  data: CreateMealInput
) => {
  // validate category
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      isActive: true,
    },
  });

  if (!category) {
    throw new Error("Invalid or inactive category");
  }

  return prisma.meal.create({
    data: {
      ...data,
      providerId,
    },
  });
};

//get all meal
const getAllMeals = async (query: any) => {
  const {
    search,
    categoryId,
    providerId,
    available,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  // search
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // filters
  if (categoryId) where.categoryId = categoryId;
  if (providerId) where.providerId = providerId;
  if (available !== undefined) where.available = available === "true";

  // price filter
  if (minPrice) where.price = { gte: Number(minPrice) };
  if (maxPrice)
    where.price = { ...(where.price || {}), lte: Number(maxPrice) };

  const meals = await prisma.meal.findMany({
    where,
    skip,
    take: Number(limit),
    
    orderBy: sortBy === "reviews"
  ? { reviews: { _count: sortOrder } }
  : { [sortBy]: sortOrder },

    include: {
      category: {
        select: { id: true, name: true },
      },
      provider: {
        select: { id: true },
      },
      _count: {
        select: { reviews: true },
      },
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

//provider delete a meal
const deleteMeal = async (mealId: string, id: string) => {
  
  const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId: id },
        select: { id: true }
    });

    if (!providerProfile) {
        throw new Error("Provider profile not found!");
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
    deleteMeal
}