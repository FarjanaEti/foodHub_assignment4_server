import express, { Router } from "express";
import { MealController } from "./menu.controller";
import auth, { UserRole } from "../../middleware/auth";


const router = express.Router();
router.post(
    "/",
    auth(UserRole.PROVIDER),
    MealController.createMeal
)
router.get("/", MealController.getAllMeals);

router.get(
    "/:mealId",
    MealController.getMealById)

router.delete(
    "/:mealId",
    auth(UserRole.PROVIDER),
    MealController.deleteMeal
)
export const MealRouter: Router = router;