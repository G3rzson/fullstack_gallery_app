import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BaseResponseType } from "../types/types";
import { apiClient } from "../setup/apiClient";

export default function useMyGaleryImagesDeleteMany(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType, unknown, string[]>({
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
