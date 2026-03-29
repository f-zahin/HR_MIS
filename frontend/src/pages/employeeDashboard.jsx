import React, { use } from "react";
import { userAuth } from "../context/authContext";
import Sidebar from "../components/EmployeeDahboard/Sidbar";
import Navbar from "../components/AdminDashboard/Navbar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
