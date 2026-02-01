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

export const orderController = {
    createOrder                          
}