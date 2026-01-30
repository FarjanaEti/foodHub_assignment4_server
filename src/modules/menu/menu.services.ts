import { Meal } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";


const createMeal = async (data: Omit<Meal, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>) => {
    const result = await prisma.meal.create({
            data                  
    })
    return result;
}

export const mealService = {
    createMeal,
}