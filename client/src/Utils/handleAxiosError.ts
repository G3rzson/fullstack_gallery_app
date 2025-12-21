import axios from "axios";

export function handleAxiosError(error: unknown): string {
  return axios.isAxiosError<{
    message?: string;
  }>(error)
    ? error.response?.data?.message || "Ismeretlen hiba történt!"
    : "Ismeretlen hiba történt!";
}
