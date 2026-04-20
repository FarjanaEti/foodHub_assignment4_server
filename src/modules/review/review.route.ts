import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";
const router = express.Router()
router.post(
  "/review",
  auth(UserRole.CUSTOMER),
 reviewController.createReview
);
router.get("/allReview",reviewController.getAllReview)
router.get("/top-rated", reviewController.getTopRatedMeals);

export const reviewRouter: Router = router;