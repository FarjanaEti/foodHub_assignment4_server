import express, { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();
router.post(
"/", 
auth(UserRole.CUSTOMER), providerController.createProvider);

export const providerRouter: Router = router;