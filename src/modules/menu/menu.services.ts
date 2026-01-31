
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




export const mealService = {
    createMeal,
}