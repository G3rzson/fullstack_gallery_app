import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GallerySchemaType } from "../validation/gallerySchema";
import type { BaseResponseType } from "../types/types";
import { useLocation } from "react-router-dom";

export default function useMyGaleryTitleUpdate() {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType, unknown, GallerySchemaType>({
    mutationFn: async (data: GallerySchemaType) => {
      const response = await apiClient.put(`${pathname}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryTitles"] });
    },
  });
}
