import { prisma } from "../../lib/prisma";

type CreateCategoryInput = {
  name: string;
};

const createCategory = async (data: CreateCategoryInput) => {
  // prevent duplicates (extra safety)
  const exists = await prisma.category.findUnique({
    where: { name: data.name },
  });

  if (exists) {
    throw new Error("Category already exists");
  }

  return prisma.category.create({
    data,
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
};

export const categoryService = {
  createCategory,
  getAllCategories,
};
