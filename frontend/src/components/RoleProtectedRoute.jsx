import React from "react";
import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // WRONG ROLE
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleProtectedRoute;