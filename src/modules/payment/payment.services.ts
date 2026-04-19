import SSLCommerzPayment from "sslcommerz-lts";
import { prisma } from "../../lib/prisma";

const store_id = process.env.SSL_STORE_ID!;
const store_passwd = process.env.SSL_STORE_PASS!;
const is_live = false;

export const initiatePayment = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  console.log("Order found:", order); 
  if (!order) throw new Error("Order not found");

  const data = {
    total_amount: order.totalAmount,
    currency: "BDT",
    tran_id: order.id,

    success_url: "https://assignment4-backend-red.vercel.app/payment/success",
    fail_url: "https://assignment4-backend-red.vercel.app/payment/fail",
    cancel_url: "https://assignment4-backend-red.vercel.app/payment/cancel",

    // Customer info
    cus_name: "Customer",
    cus_email: "test@test.com",
    cus_add1: order.address,  // ← was order.totalAmount, fix this too
    cus_phone: "01700000000",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",

    // Shipping info ← THESE WERE MISSING
    shipping_method: "NO",
    ship_name: "Customer",
    ship_add1: order.address,
    ship_city: "Dhaka",
    ship_country: "Bangladesh",

    // Product info
    product_name: "Food Order",
    product_category: "Food",
    product_profile: "general",
    num_of_item: 1,
  };

  const sslcz = new SSLCommerzPayment(
    store_id,
    store_passwd,
    is_live
  );

  const apiResponse = await sslcz.init(data);
console.log("SSLCommerz response:", apiResponse);

 if (!apiResponse.GatewayPageURL) {
    throw new Error(apiResponse.failedreason || "No gateway URL");
  }

  return apiResponse.GatewayPageURL;
};