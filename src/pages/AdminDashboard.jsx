import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSideBar } from "../components/DahsBoard/AdminSideBar";
import { Navbar } from "../components/DahsBoard/Navbar";
import usePersistentScreenshotBlackout from "../components/DisableScreenShot/DisableScreenShot";

export const AdminDashboard = () => {

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
      <AdminSideBar />
      <div className="flex-1 ml-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
