import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Navigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay />
  }

  return user ? children : <Navigate to={"/login"} />;
};
