import { prisma } from "../../lib/prisma";

// ================= CREATE ORDER =================

const createOrder = async (payload: {
  customerId: string;
  providerId: string;
  address: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}) => {
  const mealIds = payload.items.map((item) => item.mealId);

  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      available: true,
      providerId: payload.providerId,
    },
  });

  if (meals.length !== payload.items.length) {
    throw new Error("Unavailable meal detected");
  }

  let totalAmount = 0;

  const orderItems = payload.items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId)!;
    const itemTotal = meal.price * item.quantity;
    totalAmount += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  const order = await prisma.order.create({
    data: {
      customerId: payload.customerId,
      providerId: payload.providerId,
      address: payload.address,
      totalAmount,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
    },
  });

  return order;
};

// ================= ADMIN =================

const getAllOrders = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// ================= CUSTOMER =================

const getCustomerOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
  });
};

// ================= PROVIDER =================

const getProviderOrders = async (providerId: string) => {
  return prisma.order.findMany({
    where: { providerId },
    orderBy: { createdAt: "desc" },
  });
};

// ================= GET ORDER BY ID (WITH SECURITY) =================

const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      customer: {
        select: { id: true, email: true },
      },
      provider: {
        select: { id: true, restaurantName: true },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

export const orderService = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  getProviderOrders,
  getOrderById,
};
