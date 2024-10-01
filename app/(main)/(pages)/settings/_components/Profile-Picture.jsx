import React from "react";
import UploadCareButton from "./Uploadcarebutton";

const ProfilePicture = () => {
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex h-[30vh] flex-col items-center justify-center">
        <UploadCareButton />
      </div>
    </div>
  );
};

export default ProfilePicture;