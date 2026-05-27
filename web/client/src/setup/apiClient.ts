import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store for access token and setter
let accessToken: string | null = null;
let setAccessToken: ((token: string | null) => void) | null = null;

// Function to set the access token and its setter from context
export const setAuthToken = (
  token: string | null,
  setter: (token: string | null) => void,
) => {
  accessToken = token;
  setAccessToken = setter;
};

// Immediately nulls the module-level token without waiting for React re-render
export const clearAuthToken = () => {
  accessToken = null;
};

// Request interceptor: Add Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor: Handle 401 errors and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Don't retry if the request is already a refresh request
    const isRefreshRequest = originalRequest.url?.includes("/user/refresh");

    // Don't retry if the request is a login request
    const isLoginRequest = originalRequest.url?.includes("/user/login");

    // Don't retry if user is logging out or deleting account
    const isLoggingOut = sessionStorage.getItem("isLoggingOut") === "true";

    // If error is 401 and we haven't retried yet and it's not a refresh request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      !isLoginRequest &&
      !isLoggingOut
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token using a new axios instance to avoid interceptor loop
        const refreshClient = axios.create({
          baseURL: API_BASE_URL,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await refreshClient.post("/user/refresh");

        const newAccessToken = response.data.data.accessToken;

        // Update the access token in context
        if (setAccessToken) {
          setAccessToken(newAccessToken);
        }
        accessToken = newAccessToken;

        // Retry the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // If refresh fails, clear token and redirect to login
        if (setAccessToken) {
          setAccessToken(null);
        }
        accessToken = null;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
