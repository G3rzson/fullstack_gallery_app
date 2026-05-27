import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { LoginSchemaType } from "../validation/loginSchema";
import type { LoginResponse } from "../types/types";

export default function useAuthLogin() {
  return useMutation<LoginResponse, unknown, LoginSchemaType>({
    mutationFn: async (data: LoginSchemaType) => {
      const response = await apiClient.post("/user/login", data);
      return response.data;
    },
  });
}
