import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { CategoryController } from "./category.controller";

const router = express.Router();
router.post(
    "/admin/categories",
   auth(UserRole.ADMIN),
   CategoryController.createCategory
)

export const categoryRouter: Router = router;