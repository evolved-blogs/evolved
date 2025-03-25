import axios from "axios";
import { getCookie } from "./cookies";

// Define the base URL (use environment variable for flexibility)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log("API_BASE_URL", API_BASE_URL);
// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to handle requests differently on the server
api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    // Running on the server, modify headers if necessary
    config.headers["User-Agent"] = "Next.js Server";
  }

  const token = getCookie("token"); // Read token from cookies
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export default api;
