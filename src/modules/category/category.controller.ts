import { Request, Response } from "express";
import { categoryService } from "./category.services";


const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);

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

const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
};
