import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegisterFormType } from "../ZodSchemas/RegisterFormSchema";
import { api } from "../Axios/api";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";

export default function useAuthRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterFormType) => {
      const response = await api.post("/api/auth/register", data);
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
