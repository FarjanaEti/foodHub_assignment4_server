import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type UpdateUserPayload = {
  role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
};

const getAllUser = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

//update user active status  and role 


const toggleUserStatus = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new Error("User not found");

  const nextStatus =
    user.status === UserStatus.ACTIVE
      ? UserStatus. SUSPENDED
      : UserStatus.ACTIVE;

  return prisma.user.update({
    where: { id },
    data: { status: nextStatus },
  });
};

export const userServices={
  getAllUser,
  toggleUserStatus
}