import express from "express";
import * as paymentController from "./payment.controller";

const router = express.Router();

router.post("/initiate", paymentController.initiatePayment);
router.post("/success", paymentController.paymentSuccess);
router.post("/fail", paymentController.paymentFail);
router.post("/cancel", paymentController.paymentCancel); // ← was missing

export default router;