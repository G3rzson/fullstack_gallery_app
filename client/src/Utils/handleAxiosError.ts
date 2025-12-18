import axios from "axios";

type ApiErrorResponse = {
  message?: string;
};

export function handleAxiosError(error: unknown): string {
  return axios.isAxiosError<ApiErrorResponse>(error)
    ? error.response?.data?.message || "Ismeretlen hiba történt!"
    : "Ismeretlen hiba történt!";
}
