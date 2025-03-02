import axios from "axios";

// Define the base URL (use environment variable for flexibility)
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-api.com";

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

  // A
  config.headers["Authorization"] =
    `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M0N2I4NmYyODMwZWNjZGUwYWQ4ZjMiLCJlbWFpbCI6InByYW1vam5tQGdtYWlsLmNvbSIsImlhdCI6MTc0MDkyOTk1NywiZXhwIjoxNzQxMDE2MzU3fQ.5xpRT3DnnOgGDEO-IsPl359C8SiPFonguJYk4hUJd2Q"}`;

  return config;
});

export default api;
