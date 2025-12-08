import axios from "axios";

export function handleErrorMessage(isError: boolean, error: unknown) {
  return isError && axios.isAxiosError(error)
    ? error.response?.data?.message || "Ismeretlen hiba történt!"
    : isError
    ? "Ismeretlen hiba történt!"
    : null;
}
