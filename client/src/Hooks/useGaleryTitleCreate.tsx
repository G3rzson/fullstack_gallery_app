import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { GaleryTitleFormType } from "../ZodSchemas/GaleryTitleFormSchema";
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
    },
  });
}
