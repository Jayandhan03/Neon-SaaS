import axios from "axios";
import { toast } from "@/hooks/use-toast";

const api = axios.create({
  baseURL: "https://your-backend-api.com/api", // Placeholder, I will wire this up later
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const message =
      error.response?.data?.detail ||
      error.message ||
      "An unknown error occurred";

    // This check ensures toast is only called on the client side
    if (typeof window !== "undefined") {
      toast({
        title: "API Error",
        description: message,
        variant: "destructive",
      });
    } else {
        console.error("API Error:", message);
    }

    return Promise.reject(error);
  }
);

export const get = <T>(url: string, params?: object) => api.get<T>(url, { params });
export const post = <T>(url: string, data: object) => api.post<T>(url, data);
export const put = <T>(url: string, data: object) => api.put<T>(url, data);
export const del = <T>(url: string) => api.delete<T>(url);

export default api;
