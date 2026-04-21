import { Request, Response } from "express";
import { UserRole } from "../../middleware/auth";
import { cartService } from "./cart.services";


export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId || req.user?.role !== UserRole.CUSTOMER) {
      return res.status(403).json({
        success: false,
        message: "Only customers can add to cart",
      });
    }

    const result = await cartService.addToCart(userId, req.body);

    res.status(200).json({
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

const getAllCart = async (_req: Request, res: Response) => {
  const userId = _req.user?.id;
   try {
    const result = await cartService.getMyCart(userId as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;
    await cartService.clearCart(customerId);
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCart = async (req: Request, res: Response) => {
    try {
       
        const { cartId } = req.params;
        const result = await cartService.deleteCart(cartId as string)
        res.status(200).json({
            success: true,
            message: "cart deleted successfully!",
            data: result
        });
    } catch (e) {
        res.status(400).json({
            error: "cart delete failed!",
            details: e
        })
    }
}

export const cartController={
  addToCart,
  getAllCart,
  deleteCart,
  clearCart
}