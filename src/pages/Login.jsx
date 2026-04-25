import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify"; // ✅ ADDED

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  toast.dismiss();

  try {
    const response = await login(formData);
    
    // Print the complete response
    console.log("========== COMPLETE BACKEND RESPONSE ==========");
    console.log("Full response object:", JSON.stringify(response, null, 2));
    console.log("Response type:", typeof response);
    console.log("Response keys:", Object.keys(response));
    console.log("===============================================");
    
    // If response has a 'user' property, print that too
    if (response.user) {
      console.log("========== USER OBJECT ==========");
      console.log("User data:", JSON.stringify(response.user, null, 2));
      console.log("User role:", response.user.role);
      console.log("User ID:", response.user.id);
      console.log("User email:", response.user.email);
      console.log("================================");
    }
    
    // If response has a 'token' property
    if (response.token) {
      console.log("Token received:", response.token.substring(0, 50) + "...");
    }
    
    console.log("===============================================");

    // Now handle navigation based on role
    const user = response.user || response; // Handle both cases
    if (user.role === "admin") {
      navigate("/incharge");
    } else if (user.role === "faculty") {
      navigate("/faculty");
    } else if (user.role === "student") {
      navigate("/student");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.log("Login failed", error);
    console.log("Error details:", error.response?.data);
  }
};
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 dark:bg-gray-950 transition-colors duration-300 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6 transition-colors duration-300 border border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 text-gray-500"
              >
                👁
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full font-semibold py-3 px-4 rounded-lg mt-2
              ${
                isLoggingIn
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
