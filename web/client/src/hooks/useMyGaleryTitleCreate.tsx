import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GallerySchemaType } from "../validation/gallerySchema";
import type { BaseResponseType } from "../types/types";
import { apiClient } from "../setup/apiClient";
import { useLocation } from "react-router-dom";

export default function useMyGaleryTitleCreate() {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType, unknown, GallerySchemaType>({
    mutationFn: async (data: GallerySchemaType) => {
      const response = await apiClient.post(`${pathname}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryTitles"] });
    },
  });
}
