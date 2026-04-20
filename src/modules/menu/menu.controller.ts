import { Request, Response } from "express";
import { GetAllMealsParams, mealService } from "./menu.services";
import { UserRole } from "../../middleware/auth";


export const createMeal = async (req: Request, res: Response) => {
  try {
    const providerId = req.user?.providerProfile?.id;

    //  Role  validation
    if (!providerId || req.user?.role !== UserRole.PROVIDER) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can create meals.",
      });
    }

    const {
      title,
      description,
      price,
      categoryId,
      cuisine,
      dietType,
      image,
    } = req.body;

   
    if (
      !title ||
      !price ||
      !categoryId ||
      !cuisine ||
      !dietType
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number greater than 0",
      });
    }

    if (image && typeof image !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image must be a valid URL string",
      });
    }

    const meal = await mealService.createMeal(providerId, {
      title,
      description,
      price,
      categoryId,
      cuisine,
      dietType,
      image,
    });

    return res.status(201).json({
      success: true,
      data: meal,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create meal",
    });
  }
};

//grt all meals
export const getAllMeals = async (req: Request, res: Response) => {
  try {
    const {
      search, categoryId, providerId, cuisine,
      dietType, minPrice, maxPrice, available,
      page, limit,
    } = req.query;

    const params: GetAllMealsParams = {};  

    if (typeof search === "string" && search) params.search = search;
    if (typeof categoryId === "string" && categoryId) params.categoryId = categoryId;
    if (typeof providerId === "string" && providerId) params.providerId = providerId;
    if (typeof cuisine === "string" && cuisine) params.cuisine = cuisine;
    if (typeof dietType === "string" && dietType) params.dietType = dietType;
    if (available === "true") params.available = true;
    if (available === "false") params.available = false;
    if (typeof minPrice === "string" && minPrice) params.minPrice = Number(minPrice);
    if (typeof maxPrice === "string" && maxPrice) params.maxPrice = Number(maxPrice);
    params.page = typeof page === "string" && page ? Number(page) : 1;
    params.limit = typeof limit === "string" && limit ? Number(limit) : 12;

    const result = await mealService.getAllMeals(params);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
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
//provider update their meal
// provider update meal (name, price, availability)
const updateMeal = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      res.status(400).json({ success: false, message: "Meal ID is required" });
      return;
    }

    const payload = req.body;
    const result = await mealService.updateMeal(id, payload);

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Update failed" });
  }
};
//meal delete by provider
const deleteMeal = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        
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
  updateMeal,
  deleteMeal
};
