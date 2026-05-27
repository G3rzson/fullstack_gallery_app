import { AxiosError } from "axios";

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Ismeretlen hiba!",
) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message || axiosError.message || fallback;
}
