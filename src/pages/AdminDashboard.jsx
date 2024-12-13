import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSideBar } from "../components/DahsBoard/AdminSideBar";
import { Navbar } from "../components/DahsBoard/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

export const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingOverlay isLoading={loading} />;
  }

  if (!user) {
    navigate("/login");
  }
  return (
    <div className="flex bg-gray-50">
      <AdminSideBar />
      <ToastContainer />
      <div className="flex-1 ml-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
