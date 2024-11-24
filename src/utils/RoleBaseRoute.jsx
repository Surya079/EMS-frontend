import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Navigate } from "react-router-dom";

export const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!requiredRole.includes(user.role)) {
    <Navigate to={"/unauthorized"} />;
  }

  return user ? children : <Navigate to={"/login"} />;
};
