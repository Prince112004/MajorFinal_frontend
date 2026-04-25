import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ToastProvider from "./components/toastify";
import useThemeStore from "./store/useHomeStore";
import { useAuthStore } from "./store/useAuthStore";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomLoader from "./ui/CustomLoader";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import Incharge from "./pages/Incharge";
import Homepage from "./pages/HomePage";
import TestPage from "./pages/TestPage";

const App = () => {
  const { theme } = useThemeStore();
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <CustomLoader variant="blue"/>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 dark:bg-black min-h-screen md:min-h-[100dvh] w-screen">
      <ToastProvider />

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<TestPage />} />

        {/* --- Protected Routes (Authentication Required) --- */}
        
        {/* Admin Route - Only 'admin' role can access */}


        {/* Incharge Route - Only 'incharge' role can access */}
        <Route
          path="/incharge"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Incharge />
            </ProtectedRoute>
          }
        />

        {/* Faculty Route - Only 'faculty' role can access */}
        <Route
          path="/faculty"
          element={
              <Faculty />
            // <ProtectedRoute allowedRoles={["faculty"]}>
            // </ProtectedRoute>
          }
        />

        {/* Student Route - Only 'student' role can access */}
        <Route
          path="/student"
          element={
              <Student />
            // <ProtectedRoute allowedRoles={["student"]}>
            // </ProtectedRoute>
          }
        />

        {/* Optional: Role-specific dashboard redirects */}
        {/* If user visits /dashboard, redirect based on role */}

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

// Helper component to redirect users to their role-specific page
const RoleBasedRedirect = () => {
  const { authUser } = useAuthStore();
  
  switch (authUser?.role) {
    case "admin":
      return <Navigate to="/incharge" replace />;
    case "faculty":
      return <Navigate to="/faculty" replace />;
    case "student":
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default App;