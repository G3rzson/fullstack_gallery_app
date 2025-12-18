import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../Axios/api";
import type { GaleryTitleFormType } from "../ZodSchemas/GaleryTitleFormSchema";
import { handleAxiosError } from "../Utils/handleAxiosError";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";

export default function useGaleryTitleCreate() {
  const queryClient = useQueryClient();
  return useMutation<
    BackendResponseType<GaleryTitleType>,
    unknown,
    GaleryTitleFormType
  >({
    mutationFn: async (data) => {
      const response = await api.post<BackendResponseType<GaleryTitleType>>(
        "/api/galery/title/create",
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
