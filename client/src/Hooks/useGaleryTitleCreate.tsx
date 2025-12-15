import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/api";
import type { GaleryTitleFormType } from "../Validation/GaleryTitleFormSchema";
import type { GaleryTitleType, ResponseType } from "../Types/types";
import { handleAxiosError } from "../Functions/handleAxiosError";

export default function useGaleryTitleCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: GaleryTitleFormType) => {
      const response = await api.post<ResponseType<GaleryTitleType>>(
        "/galery/galery-title/create",
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });

      toast.success(data.message || "Galéria létrehozva!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
