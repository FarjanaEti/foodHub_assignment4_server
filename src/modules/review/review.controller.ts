import { Request, Response } from "express";
import { reviewServices } from "./review.services";

export const createReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewServices.createReview({
      userId: req.user!.id,       
      mealId: req.body.mealId,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    });

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

const getAllReview = async (_req: Request, res: Response) => {
  try {
    const result = await reviewServices.getAllReview();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
    });
  }
};

export const reviewController={
       createReview ,
       getAllReview                      
}