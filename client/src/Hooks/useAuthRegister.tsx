import { useMutation } from "@tanstack/react-query";
import type { RegisterFormType } from "../ZodSchemas/RegisterFormSchema";
import { api } from "../Axios/api";
import type { BackendResponseType } from "../Types/types";

export default function useAuthRegister() {
  return useMutation<BackendResponseType, unknown, RegisterFormType>({
    mutationFn: async (data) => {
      const response = await api.post<BackendResponseType>(
        "/api/auth/register",
        data
      );
      return response.data;
    },
  });
}
