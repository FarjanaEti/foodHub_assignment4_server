import express, { Router } from "express";

import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get(
  "/allUser",
  auth(UserRole.ADMIN),
  userController.getAllUser
);

router.patch(
  "/user/:id",
  auth(UserRole.ADMIN),
  userController.toggleUserStatus
);

export const userRouter: Router = router;