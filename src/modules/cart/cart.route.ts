import express, { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";


const router = express.Router();
router.post(
    "/cart",auth(UserRole.CUSTOMER),
    cartController.addToCart
)

router.get("/allCart", auth(UserRole.CUSTOMER),
cartController.getAllCart);
router.delete("/clearCart", auth(UserRole.CUSTOMER), cartController.clearCart);
router.delete("/:cartId", auth(UserRole.CUSTOMER),
cartController.deleteCart);

export const cartRouter: Router = router;