import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";
import type { GallerySchemaType } from "../validation/gallerySchema";

export default function useGaleryTitleCreate() {
  return useMutation({
    mutationFn: async (data: GallerySchemaType) => {
      const response = await apiClient.post("/galery/title/create", data);
      return response.data;
    },
  });
}
