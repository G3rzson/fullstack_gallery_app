import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GallerySchemaType } from "../validation/gallerySchema";
import type { BaseResponseType } from "../types/types";
import { apiClient } from "../setup/apiClient";

export default function useMyGaleryTitleCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GallerySchemaType) => {
      const response = await apiClient.post<BaseResponseType>(
        "/galery/title/create",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitle"] });
    },
  });
}
