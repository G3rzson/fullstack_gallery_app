import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { GaleryTitleFormType } from "../ZodSchemas/GaleryTitleFormSchema";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";

export default function useGaleryTitle(mode: "create" | "update", id?: string) {
  const queryClient = useQueryClient();
  return useMutation<
    BackendResponseType<GaleryTitleType>,
    unknown,
    GaleryTitleFormType
  >({
    mutationFn: async (data) => {
      if (mode === "create") {
        const response = await api.post<BackendResponseType<GaleryTitleType>>(
          "/api/galery/title/create",
          data
        );
        return response.data;
      }

      if (!id) throw new Error("Missing galery title id for update");

      const response = await api.put<BackendResponseType<GaleryTitleType>>(
        `/api/galery/title/update/${id}`,
        data
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
    },
  });
}
