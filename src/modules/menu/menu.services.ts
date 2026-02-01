
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
    orderBy: {
      [sortBy]: sortOrder,
    },
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

export const mealService = {
    createMeal,
    getAllMeals
}