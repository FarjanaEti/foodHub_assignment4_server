import { prisma } from "../../lib/prisma";

type CreateReviewInput = {
 userId: string;
  mealId: string;
  rating: number;
  comment?: string;
};

const createReview = async (data: CreateReviewInput) => {
  // 1. Check user ordered this meal and it's delivered
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

  // 2. Prevent duplicate review (enforced by @@unique too)
  const existing = await prisma.review.findFirst({
    where: {
      userId: data.userId,
      mealId: data.mealId,
    },
  });

  if (existing) {
    throw new Error("You already reviewed this meal");
  }

  // 3. Create review
  return prisma.review.create({
    data: {
      userId: data.userId,
      mealId: data.mealId,
      rating: data.rating,
      comment: data.comment,
    },
  });
};

const getAllReview = async () => {
  return prisma.review.findMany({
    orderBy: { createdAt: "asc" },
  });
};
export const reviewServices={
      createReview,
      getAllReview                        
}