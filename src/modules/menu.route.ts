import express, { Router } from "express";

import { MealController } from "./menu.controller";

const router = express.Router();
router.post(
    "/",
    MealController.createMeal
)

export const MealRouter: Router = router;