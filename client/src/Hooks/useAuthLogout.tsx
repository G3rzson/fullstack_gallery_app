import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { ResponseType, WithAuthInfoType } from "../Types/types";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Functions/handleAxiosError";

export function useAuthLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post<ResponseType<WithAuthInfoType>>(
        "http://localhost:8000/auth/logout"
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.clear();

      toast.success(data.message || "Sikeres kijelentkezés!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
