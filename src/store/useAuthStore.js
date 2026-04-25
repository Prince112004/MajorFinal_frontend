// store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      
      // Save token to localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      // Store only the user object
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong during signup");
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      
      // Save token to localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      // Store only the user object
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid login credentials");
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      // Optional: Call logout endpoint if you have one
      // await axiosInstance.post("/auth/logout");
      
      // Remove token from localStorage
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }
      
      // Try to get current user info (optional - you can skip this if not needed)
      try {
        const res = await axiosInstance.get("/auth/me");
        set({ authUser: res.data.user });
      } catch (error) {
        // If token is invalid, clear it
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          set({ authUser: null });
        }
      }
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));