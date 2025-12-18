import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginFormType } from "../ZodSchemas/LoginFormSchema";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";
import { api } from "../Axios/api";

export default function useAuthLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormType) => {
      const response = await api.post("/api/auth/login", data);
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
