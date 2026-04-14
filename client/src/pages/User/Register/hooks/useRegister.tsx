import { useMutation } from "@tanstack/react-query";
import type { RegisterSchemaType } from "../Validation/registerSchema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const response = await axios.post(`${API_BASE_URL}/user/register`, data);
      return response.data;
    },
  });
}
