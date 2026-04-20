import { Request, Response } from "express";
import { orderService } from "./order.services";

//  CREATE 
const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, paymentMethod, providerId, address } = req.body;
    const parsedItems =
      typeof items === "string" ? JSON.parse(items) : items;

    const result = await orderService.createOrder({
      customerId: req.user!.id,
      providerId,
      address,
      paymentMethod,
      items: parsedItems, 
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

//  ADMIN 
const getAllOrders = async (_req: Request, res: Response) => {
  const result = await orderService.getAllOrders();

  res.status(200).json({
    success: true,
    data: result,
  });
};

//  CUSTOMER 
const getMyOrders = async (req: Request, res: Response) => {
  const result = await orderService.getCustomerOrders(req.user!.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

//  PROVIDER 

const getProviderOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getProviderOrders(req.user!.id);

  res.status(200).json({
    success: true,
    data: orders,
  });
};

// GET ORDER BY ID 
const getOrderById = async (req: Request, res: Response) => {
  try {
   
    const orderId = req.params.orderId as string;
    const order = await orderService.getOrderById(orderId);

    const user = req.user!;
    if (
      user.role === "CUSTOMER" && 
      order.customerId !== user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (user.role === "PROVIDER" && !user.providerProfile) {
  return res.status(403).json({
    success: false,
    message: "Provider profile not found",
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

//update order
const updateOrder = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

     if (!id) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  const { status } = req.body; 

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required",
    });
  }

  const result = await orderService.updateOrder(id, status);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getMostOrderedMeals = async (_req: Request, res: Response) => {
  try {
    const result = await orderService.getMostOrderedMeals();
    res.status(200).json({ success: true, data: result });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch most ordered meals" });
  }
};
export const orderController = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getProviderOrders,
  getOrderById,
  updateOrder,
  getMostOrderedMeals
};
