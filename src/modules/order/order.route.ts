import express, { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

// Create order 
router.post(
  "/",
  auth(UserRole.CUSTOMER),
  orderController.createOrder
);

// Customer My Orders
router.get(
  "/myOrders",
  auth(UserRole.CUSTOMER),
  orderController.getMyOrders
);

// Provider Their Orders
router.get(
  "/providerOrders",
  auth(UserRole.PROVIDER),
  orderController.getProviderOrders
);

// Admin All Orders
router.get(
  "/allOrders",
  auth(UserRole.ADMIN),
  orderController.getAllOrders
);

// Get Order by ID 
router.get(
  "/:orderId",
  auth(
    UserRole.ADMIN,
    UserRole.PROVIDER,
    UserRole.CUSTOMER
  ),
  orderController.getOrderById
);

export const orderRouter: Router = router;
