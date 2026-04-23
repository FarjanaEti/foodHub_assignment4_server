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
router.get("/myMeals",auth(UserRole.PROVIDER),
 MealController.getMyMeals);

router.get(
    "/:mealId",
    MealController.getMealById)

router.patch("/:mealId", auth(UserRole.PROVIDER), MealController.updateMeal);
router.delete(
    "/:mealId",
    auth(UserRole.PROVIDER),
    MealController.deleteMeal
)

router.delete("/:mealId",auth(UserRole.PROVIDER),
MealController.updateMeal
)
export const MealRouter: Router = router;