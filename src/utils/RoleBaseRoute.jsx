import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Navigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

export const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!requiredRole.includes(user.role)) {
    <Navigate to={"/unauthorized"} />;
  }

  return user ? children : <Navigate to={"/login"} />;
};
