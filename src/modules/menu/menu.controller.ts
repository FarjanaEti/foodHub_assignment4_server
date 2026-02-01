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

    // boolean parsing
    let available: boolean | undefined = undefined;
    if (req.query.available === "true") available = true;
    if (req.query.available === "false") available = false;

    const minPrice = req.query.minPrice
      ? Number(req.query.minPrice)
      : undefined;

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;

    const { page, limit, sortBy, sortOrder } =
      paginationSortingHelper(req.query);

    const result = await mealService.getAllMeals({
      search: searchString,
      categoryId,
      providerId,
      available,
      minPrice,
      maxPrice,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Meals fetch failed",
      error: error.message,
    });
  }
};

export const MealController = {
  createMeal,
  getAllMeals
};
