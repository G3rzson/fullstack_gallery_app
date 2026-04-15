import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { LoginSchemaType } from "../validation/loginSchema";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default function useAuthLogin() {
  return useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const response = await axios.post(`${API_BASE_URL}/user/login`, data, {
        withCredentials: true,
      });
      return response.data;
    },
  });
}
