import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGalleryImageUpload(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post(
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
