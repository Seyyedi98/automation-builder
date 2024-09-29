import ProfileForm from "@/app/components/forms/profile-form";
import React from "react";
import ProfilePicture from "./_components/Profile-Picture";

const Settings = () => {
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
        <ProfileForm />
      </div>
    </div>
  );
};

export default Settings;
