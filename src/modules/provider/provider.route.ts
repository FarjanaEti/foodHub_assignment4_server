import express, { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();
router.post(
"/", 
auth(UserRole.PROVIDER), providerController.createProvider);

router.get(
    "/",
    providerController.getAllProviders
)

router.get("/:providerId",providerController.getProviderById)
router.delete("/:providerId",auth(UserRole.ADMIN),providerController.deleteProvider)

export const providerRouter: Router = router;