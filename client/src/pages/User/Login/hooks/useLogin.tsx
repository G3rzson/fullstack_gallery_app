import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../setup/apiClient";
import type { LoginSchemaType } from "../validation/loginSchema";

export default function useAuthLogin() {
  return useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const response = await apiClient.post("/user/login", data);
      return response.data;
    },
  });
}
