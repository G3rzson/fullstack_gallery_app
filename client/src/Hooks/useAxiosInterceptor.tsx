import { useEffect } from "react";
import { useContextProvider } from "./useContextProvider";
import api from "../api/api";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function useAxiosInterceptor() {
  const { accessToken, setAccessToken, setUser } = useContextProvider();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const response = await api.post("/auth/refresh", {});
            const newAccessToken = response.data?.accessToken;
            const user = response.data?.user;

            if (newAccessToken && user) {
              setAccessToken(newAccessToken);
              setUser(user);
              processQueue(null, newAccessToken);

              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              originalRequest._retry = false;

              return api(originalRequest);
            }
          } catch (refreshError) {
            processQueue(refreshError, null);
            setUser(null);
            setAccessToken(null);
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);
}
