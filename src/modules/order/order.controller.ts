import { Request, Response } from "express";
import { orderServiceProvider } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderServiceProvider.createOrder({
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

//get all order
const getAllOrder = async (_req: Request, res: Response) => {
  try {
    const result = await orderServiceProvider.getAllOrder();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all order",
    });
  }
};

//het order by id
const getOrderById = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params
        const result = await orderServiceProvider.getOrderById(orderId as string)
        res.status(200).json(result)
    } catch (e :any) {
         res.status(404).json({
      success: false,
      message: e.message || "order not found",
    });
    }
}
export const orderController = {
    createOrder ,
    getAllOrder,
    getOrderById
                         
}