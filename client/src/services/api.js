import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Properly handle URL concatenation to avoid double slashes
const getBaseURL = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
  // Remove trailing slash if it exists, then add /api
  return `${backendUrl.replace(/\/$/, '')}/api`;
};

const API_BASE_URL = getBaseURL();

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
