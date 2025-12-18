import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";

export function useAuthLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/auth/logout");
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
