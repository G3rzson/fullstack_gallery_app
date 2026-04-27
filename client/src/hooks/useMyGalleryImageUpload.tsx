import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";

export default function useMyGalleryImageUpload(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post<BaseResponseType>(
        `/galery/images/upload/${galleryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryImages", galleryId] });
    },
  });
}
