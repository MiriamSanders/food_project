// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  // Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // If no user, redirect to login
  if (!user) return <Navigate to="/" replace />;

  // If allowedRoles is defined and user.role not included, redirect
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Everything fine
  return children;
}
