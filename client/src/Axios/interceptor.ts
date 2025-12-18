import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, refreshApi } from "./api";
import { useContextProvider } from "../Hooks/useContextProvider";
import { queryClient } from "../ReactQuery/queryClient";
import {
  AxiosHeaders,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

export function useAxiosInterceptor() {
  const { accessToken, setAccessToken, setUser } = useContextProvider();
  const navigate = useNavigate();

  useEffect(() => {
    /** REQUEST INTERCEPTOR */
    const requestInterceptor = api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const headers: AxiosHeaders =
          (config.headers as AxiosHeaders) ?? new AxiosHeaders();

        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }

        return { ...config, headers };
      }
    );

    /** RESPONSE INTERCEPTOR */
    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then((token) => {
              const headers: AxiosHeaders =
                (originalRequest.headers as AxiosHeaders) ?? new AxiosHeaders();
              headers.set("Authorization", `Bearer ${token}`);
              return api({ ...originalRequest, headers });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const { data } = await refreshApi.post<{
              accessToken: string;
              user: string;
            }>("/api/auth/refresh");

            const { accessToken: newToken, user } = data;

            setAccessToken(newToken);
            setUser(user);

            processQueue(null, newToken);

            const headers: AxiosHeaders =
              (originalRequest.headers as AxiosHeaders) ?? new AxiosHeaders();
            headers.set("Authorization", `Bearer ${newToken}`);

            return api({ ...originalRequest, headers });
          } catch (refreshError) {
            processQueue(refreshError, null);

            queryClient.clear();

            setUser(null);
            setAccessToken(null);
            navigate("/auth/login", { replace: true });

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
  }, [accessToken, setAccessToken, setUser, navigate]);
}
