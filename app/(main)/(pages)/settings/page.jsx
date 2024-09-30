import ProfileForm from "@/app/components/forms/profile-form";
import React from "react";
import ProfilePicture from "./_components/Profile-Picture";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Settings = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const user = await prisma.user.findUnique({
    where: { clerkId: authUser.id },
  });

  const updateUserInfo = async (name) => {
    "use server";
    const updateUser = await prisma.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        name,
      },
    });
    return updateUser;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1
        className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/50
       p-6 text-4xl backdrop-filter-lg"
      >
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold"> Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <ProfilePicture onDelete={() => {}}></ProfilePicture>
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;
