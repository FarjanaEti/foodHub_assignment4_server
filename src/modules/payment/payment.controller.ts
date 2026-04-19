import { prisma } from "../../lib/prisma";
import * as paymentService from "./payment.services";
import { Request, Response } from "express";

// INITIATE — called by Next.js server action
export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
   console.log(orderId)
    if (!orderId) {
      res.status(400).json({ message: "orderId is required" });
      return;
    }

    const url = await paymentService.initiatePayment(orderId);

    res.json({ url });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// SUCCESS CALLBACK — SSLCommerz POSTs here after successful payment
export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body;
   console.log("✅ Payment success hit!", tran_id);
   
    await prisma.order.update({
      where: { id: tran_id },
      data: {
        paymentStatus: "PAID",
        status: "PLACED",
        transactionId: tran_id,
      },
    });

    // Redirect back to your Next.js success page
     res.redirect("https://assignment4-client-lilac.vercel.app/dashboard/payment-success");
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// FAIL CALLBACK — SSLCommerz POSTs here on failure
export const paymentFail = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body;

    await prisma.order.update({
      where: { id: tran_id },
      data: {
        paymentStatus: "FAILED",
        status: "CANCELLED",
      },
    });

      res.redirect("https://assignment4-client-lilac.vercel.app/dashboard/payment-fail");
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// CANCEL CALLBACK (add route for this too)
export const paymentCancel = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body;

    await prisma.order.update({
      where: { id: tran_id },
      data: {
        paymentStatus: "FAILED",
        status: "CANCELLED",
      },
    });

      res.redirect("https://assignment4-client-lilac.vercel.app/dashboard/payment-cancel");
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};