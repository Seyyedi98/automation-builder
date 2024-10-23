"use server";

import prisma from "@/lib/client";

export const getUserData = async (id: string) => {
  const user_info = await prisma.user.findUnique({
    where: {
      clerkId: id,
    },
    include: {
      connections: true,
    },
  });

  return user_info;
};
