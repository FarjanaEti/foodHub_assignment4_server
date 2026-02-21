import { Request, Response } from "express";
import { mealService } from "./menu.services";
import { UserRole } from "../../middleware/auth";
import paginationSortingHelper from "../../helper/paginationSortingHelper";



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

//grt all meals
const getAllMeals = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const searchString =
      typeof search === "string" ? search : undefined;

    const categoryId = req.query.categoryId as string | undefined;
    const providerId = req.query.providerId as string | undefined;

    let available: boolean | undefined = undefined;
    if (req.query.available === "true") available = true;
    if (req.query.available === "false") available = false;

    const minPrice = req.query.minPrice
      ? Number(req.query.minPrice)
      : undefined;

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;

    // ❌ pagination removed
    const result = await mealService.getAllMeals({
      search: searchString,
      categoryId,
      providerId,
      available,
      minPrice,
      maxPrice,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Meals fetch failed",
      error: error.message,
    });
  }
};
//get provider own meals
const getMyMeals = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== "PROVIDER") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const providerId = user.providerProfile?.id;

    if (!providerId) {
      return res.status(400).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const result = await mealService.getMyMeals(
      providerId,
      req.query
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch provider meals",
      error: error.message,
    });
  }
};


//get meal by id
const getMealById = async (req: Request, res: Response) => {
    try {
    
        const { mealId } = req.params
        const result = await mealService.getMealById(mealId as string)
        res.status(200).json(result)
    } catch (e :any) {
         res.status(404).json({
      success: false,
      message: e.message || "Meal not found",
    });
    }
}
//meal delete by provider
const deleteMeal = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        console.log(user?.id)
        const { mealId } = req.params;
        const result = await mealService.deleteMeal(mealId as string, user?.id as string)
        res.status(200).json({
            success: true,
            message: "Meal deleted successfully!",
            data: result
        });
    } catch (e) {
        res.status(400).json({
            error: "meal delete failed!",
            details: e
        })
    }
}
export const MealController = {
  createMeal,
  getAllMeals,
  getMyMeals,
  getMealById,
  deleteMeal
};
