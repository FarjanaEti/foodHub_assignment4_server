import { Request, Response } from "express";
import { orderService } from "./order.services";

// ================= CREATE =================

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.createOrder({
      customerId: req.user!.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADMIN =================

const getAllOrders = async (_req: Request, res: Response) => {
  const result = await orderService.getAllOrders();

  res.status(200).json({
    success: true,
    data: result,
  });
};

// ================= CUSTOMER =================

const getMyOrders = async (req: Request, res: Response) => {
  const result = await orderService.getCustomerOrders(req.user!.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

// ================= PROVIDER =================

const getProviderOrders = async (req: Request, res: Response) => {
  const result = await orderService.getProviderOrders(req.user!.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

// ================= GET ORDER BY ID (ROLE VALIDATION) =================

const getOrderById = async (req: Request, res: Response) => {
  try {
    // const { orderId } = req.params;
    const orderId = req.params.orderId as string;
    const order = await orderService.getOrderById(orderId);

    const user = req.user!;

    // 🔐 Ownership validation
    if (
      user.role === "CUSTOMER" &&
      order.customerId !== user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      user.role === "PROVIDER" &&
      order.providerId !== user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getProviderOrders,
  getOrderById,
};
