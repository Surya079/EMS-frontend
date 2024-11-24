import React from "react";
import { useAuth } from "../Context/Auth_context";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }

  return user ? children : <Navigate to={"/login"} />;
};
