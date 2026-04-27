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

    // If error is 401 and we haven't retried yet and it's not a refresh request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}/user/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

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
