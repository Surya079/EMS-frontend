import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/DahsBoard/Navbar";
import { EmployeeSidebar } from "../components/EmployeeDashboard/EmployeeSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Employee_dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    navigate("/login");
  }
  return (
    <div className="flex bg-gray-50">
      <EmployeeSidebar />
      <ToastContainer />
      <div className="flex-1 ml-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
