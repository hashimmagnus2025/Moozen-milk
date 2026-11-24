import axios from "axios";
import ApiError from "./ApiError";
import { getToken, clearToken } from "@/lib/adminAuth";

/**
 * Single Axios instance for the whole app — server components, client
 * components and route handlers all import this instead of calling
 * axios directly. Works both server-side (Node -> Express, no CORS
 * involved) and in the browser (subject to the backend's CORS policy).
 */
// No default Content-Type header here on purpose: axios sets
// application/json automatically for plain object payloads, and — more
// importantly — lets the browser set the correct multipart/form-data
// boundary when a request body is a FormData instance (admin image
// uploads). A hardcoded default would break that second case.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  // Unwrap the backend's { success, message, data } envelope.
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) clearToken();
      return Promise.reject(new ApiError(status, data?.message || "Request failed.", data?.details));
    }
    if (error.request) {
      return Promise.reject(
        new ApiError(0, "Can't reach the server right now. Please check your connection.")
      );
    }
    return Promise.reject(new ApiError(0, error.message || "Something went wrong."));
  }
);

export default apiClient;
