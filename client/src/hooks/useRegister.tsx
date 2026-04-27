import { useMutation } from "@tanstack/react-query";
import type { RegisterSchemaType } from "../validation/registerSchema";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";

export default function useRegister() {
  return useMutation<BaseResponseType, unknown, RegisterSchemaType>({
    mutationFn: async (data: RegisterSchemaType) => {
      const response = await apiClient.post("/user/register", data);
      return response.data;
    },
  });
}
