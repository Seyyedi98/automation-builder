import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {children}
    </div>
  );
};

export default layout;
