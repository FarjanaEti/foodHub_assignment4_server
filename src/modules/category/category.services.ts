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
    // where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
};

const toggleCategory = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: { isActive: !category.isActive },
  });
};


export const categoryService = {
  createCategory,
  getAllCategories,
  toggleCategory
};
