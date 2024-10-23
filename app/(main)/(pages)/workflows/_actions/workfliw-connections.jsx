"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export const getGoogleListener = async () => {
  const { userId } = auth();

  if (userId) {
    const listener = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        googleResourceId: true,
      },
    });

    if (listener) return listener;
  }
};
