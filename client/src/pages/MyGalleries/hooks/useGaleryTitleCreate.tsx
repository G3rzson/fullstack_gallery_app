import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";
import type { GallerySchemaType } from "../validation/gallerySchema";

export default function useGaleryTitleCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GallerySchemaType) => {
      const response = await apiClient.post("/galery/title/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitle"] });
    },
  });
}
