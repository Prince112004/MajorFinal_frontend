import axios from "axios";

// Create a custom axios instance
// export const axiosInstance = axios.create({
//   // Update this URL to point to wherever your backend server is running!
//   // Example: "http://localhost:5000/api"
//   baseURL: "http://localhost:3000/api/v1",

//   // This is crucial if your backend uses HTTP-only cookies for authentication
//   withCredentials: true,
// });
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor to add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common['Authorization'];
      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);