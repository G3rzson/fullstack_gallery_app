import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GallerySchemaType } from "../validation/gallerySchema";
import type { BaseResponseType } from "../types/types";

export default function useMyGaleryTitleUpdate(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType, unknown, GallerySchemaType>({
    mutationFn: async (data: GallerySchemaType) => {
      const response = await apiClient.put(
        `/galery/title/update/${galleryId}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitle"] });
      queryClient.invalidateQueries({ queryKey: ["galeryTitle", galleryId] });
    },
  });
}
