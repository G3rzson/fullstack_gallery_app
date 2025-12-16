import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginFormType } from "../Validation/LoginFormSchema";
import type { WithAuthInfoType, ResponseType } from "../Types/types";
import api from "../api/api";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Functions/handleAxiosError";

export default function useAuthLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormType) => {
      const response = await api.post<ResponseType<WithAuthInfoType>>(
        "/api/auth/login",
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });

      toast.success(data.message || "Sikeres bejelentkezés!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
