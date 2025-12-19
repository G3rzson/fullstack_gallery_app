import { useMutation } from "@tanstack/react-query";
import type { LoginFormType } from "../ZodSchemas/LoginFormSchema";
import { api } from "../Axios/api";
import type { BackendResponseType, WithAuthDataType } from "../Types/types";

export default function useAuthLogin() {
  return useMutation<
    BackendResponseType<WithAuthDataType>,
    unknown,
    LoginFormType
  >({
    mutationFn: async (data) => {
      const response = await api.post<BackendResponseType<WithAuthDataType>>(
        "/api/auth/login",
        data
      );
      return response.data;
    },
  });
}
