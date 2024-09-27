import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import InfoBar from "../components/infobar/InfoBar";

const Layout = ({ children }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
