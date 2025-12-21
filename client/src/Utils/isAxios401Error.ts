import axios from "axios";

export function isAxios401Error(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401;
}
