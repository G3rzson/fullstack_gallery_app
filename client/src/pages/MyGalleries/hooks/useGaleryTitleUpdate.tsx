import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";
import type { GallerySchemaType } from "../validation/gallerySchema";

export default function useGaleryTitleUpdate(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
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
