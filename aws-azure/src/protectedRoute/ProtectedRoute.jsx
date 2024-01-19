import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const verifyToken = localStorage.getItem("token");

  return verifyToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
