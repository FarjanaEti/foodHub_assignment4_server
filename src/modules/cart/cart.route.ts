import express, { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";


const router = express.Router();
router.post(
    "/cart",auth(UserRole.CUSTOMER),
    cartController.addToCart
)
// router.patch(
//   "/categories/:id",
//   auth(UserRole.ADMIN),
// );
router.get("/allCart", auth(UserRole.CUSTOMER),
cartController.getAllCart);
router.delete("/:cartId", auth(UserRole.CUSTOMER),
cartController.deleteCart);

export const cartRouter: Router = router;