import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BaseResponseType } from "../types/types";
import { apiClient } from "../setup/apiClient";
import { useLocation } from "react-router-dom";

export default function useMyGalleryImageDelete(galleryImageId: string) {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType>({
    mutationFn: async () => {
      const response = await apiClient.delete(`${pathname}/${galleryImageId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["galleryImages"],
      });
    },
  });
}
