import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";
import { useLocation } from "react-router-dom";

export default function useMyGalleryImageUpload() {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post<BaseResponseType>(
        `${pathname}`,
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
      queryClient.invalidateQueries({ queryKey: ["galleryImages"] });
    },
  });
}
