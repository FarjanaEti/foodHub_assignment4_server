import { Request, Response } from "express";
import { mealService } from "./menu.services";
import { UserRole } from "../../middleware/auth";


const createMeal = async (req: Request, res: Response) => {
  try {

    const providerId = req.user?.providerProfile?.id;
    console.log(providerId,req.user?.role)

if (!providerId || req.user?.role !== UserRole.PROVIDER) {
  return res.status(403).json({
    success: false,
    message: "Access denied. Only providers can create meals.",
  });
}

    const result = await mealService.createMeal(providerId, req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const MealController = {
  createMeal,
};
