import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGaleryImagesDeleteMany(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await apiClient.delete(
        `/galery/image/delete-many/${galleryId}`,
        {
          data: { ids },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryImage", galleryId] });
    },
  });
}
