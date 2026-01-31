import express, { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();
router.post(
"/", 
auth(UserRole.CUSTOMER), providerController.createProvider);

router.get(
    "/",
    providerController.getAllProviders
)

export const providerRouter: Router = router;