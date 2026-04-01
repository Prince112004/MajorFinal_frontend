import axios from "axios";

// Create a custom axios instance
export const axiosInstance = axios.create({
  // Update this URL to point to wherever your backend server is running!
  // Example: "http://localhost:5000/api"
  baseURL: "http://localhost:5000/api",

  // This is crucial if your backend uses HTTP-only cookies for authentication
  withCredentials: true,
});
