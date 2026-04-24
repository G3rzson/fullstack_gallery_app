import { useMutation } from "@tanstack/react-query";
import type { RegisterSchemaType } from "../registerSchema";
import { apiClient } from "../../../../setup/apiClient";

export default function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const response = await apiClient.post("/user/register", data);
      return response.data;
    },
  });
}
