import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="flex overflow-hidden min-h-screen">
      <Sidebar />
      <div className="grow overflow-auto h-full px-3 lg:px-6 ml-258">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
