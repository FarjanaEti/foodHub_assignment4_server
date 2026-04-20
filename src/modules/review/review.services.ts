import { prisma } from "../../lib/prisma";

type CreateReviewInput = {
 userId: string;
  mealId: string;
  rating: number;
  comment?: string;
};

const createReview = async (data: CreateReviewInput) => {
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId: data.mealId,
      order: {
        customerId: data.userId,
        status: "DELIVERED",
      },
    },
  });

  if (!orderItem) {
    throw new Error("You can only review meals from delivered orders");
  }

  const existing = await prisma.review.findFirst({
    where: {
      userId: data.userId,
      mealId: data.mealId,
    },
  });

  if (existing) {
    throw new Error("You already reviewed this meal");
  }

  return prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment ?? null, // ← fix: undefined → null
      user: { connect: { id: data.userId } },   // ← fix: use connect
      meal: { connect: { id: data.mealId } },   // ← fix: use connect
    },
  });
};

const getAllReview = async () => {
  return prisma.review.findMany({
    orderBy: { createdAt: "asc" },
  });
};

const getTopRatedMeals = async () => {
  const meals = await prisma.review.groupBy({
    by: ["mealId"],
    _avg: { rating: true },
    _count: { rating: true },
    orderBy: { _avg: { rating: "desc" } },
    take: 10,
  });

  // Get meal details for each
  const mealIds = meals.map((m) => m.mealId);
  const mealDetails = await prisma.meal.findMany({
    where: { id: { in: mealIds } },
    select: { id: true, title: true, price: true, image: true, description: true, },
  });

  return meals.map((m) => ({
    mealId: m.mealId,
    avgRating: Math.round((m._avg.rating ?? 0) * 10) / 10,
    reviewCount: m._count.rating,
    meal: mealDetails.find((d) => d.id === m.mealId),
  }));
};

export const reviewServices = {
  createReview,
  getAllReview,
  getTopRatedMeals, 
};
