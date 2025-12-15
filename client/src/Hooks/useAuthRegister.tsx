import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegisterFormType } from "../Validation/RegisterFormSchema";
import api from "../api/api";
import toast from "react-hot-toast";
import type { ResponseType } from "../Types/types";
import { handleAxiosError } from "../Functions/handleAxiosError";

export default function useAuthRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterFormType) => {
      const response = await api.post<ResponseType>("/auth/register", data);
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });

      toast.success(data.message || "Sikeres regisztráció!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
