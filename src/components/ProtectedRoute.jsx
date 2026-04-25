import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  // 1. Wait for the initial authentication check to finish
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 2. Not Logged In? Send them to the login page
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. Role Checking: If this route requires specific roles
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(authUser.role)) {
    // Redirect to their role-specific page
    switch (authUser.role) {
      case "admin":
        return <Navigate to="/incharge" replace />;
      case "faculty":
        return <Navigate to="/faculty" replace />;
      case "student":
        return <Navigate to="/student" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // 4. If they pass all checks, render the page
  return children;
};

export default ProtectedRoute;