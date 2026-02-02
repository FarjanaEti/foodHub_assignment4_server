import express, { Router } from "express";
import { orderController } from "./order.controller";

import auth, { UserRole } from "../../middleware/auth";


const router = express.Router();
router.post(
    "/",
    auth(UserRole.CUSTOMER),
  orderController.createOrder
)

router.get("/allOrders",auth(UserRole.PROVIDER,UserRole.ADMIN), 
  orderController.getAllOrder
)

router.get("/:orderId",orderController.getOrderById)


export const orderRouter: Router = router;