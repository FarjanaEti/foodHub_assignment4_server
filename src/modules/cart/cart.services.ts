import { prisma } from "../../lib/prisma";


interface AddToCartInput {
  mealId: string;
  quantity: number;
}

const addToCart = async (
  userId: string,
  data: AddToCartInput
) => {
  const { mealId, quantity } = data;

  // 1️⃣ Validate meal
  const meal = await prisma.meal.findFirst({
    where: {
      id: mealId,
      available: true,
    },
  });

  if (!meal) {
    throw new Error("Meal not available");
  }

  const providerId = meal.providerId;

  // 2️⃣ Find cart for (user + provider)
  let cart = await prisma.cart.findFirst({
    where: {
      userId,
      providerId,
    },
  });

  // 3️⃣ Create cart if not exists
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        providerId,
      },
    });
  }

  // 4️⃣ Add or update cart item
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      mealId,
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
        subtotal:
          (existingItem.quantity + quantity) * Number(meal.price),
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      quantity,
      subtotal: quantity * Number(meal.price),
    },
  });
};

const getMyCart = async (userId: string) => {
  return prisma.cart.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });
};

 const deleteCart = async (cartId: string) => {
  const cartItems = await prisma.cartItem.findUnique({
    where: { id: cartId },
  });

  if (!cartItems) {
    throw new Error("item not found!");
  }

  return await prisma.cartItem.delete({
    where: { id: cartId },
  });
};

export const cartService = {
  addToCart,
  getMyCart,
  deleteCart
};