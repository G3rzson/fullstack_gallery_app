import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BaseResponseType } from "../types/types";
import { apiClient } from "../setup/apiClient";

export default function useGaleryImageDelete(galleryImageId: string) {
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType>({
    mutationFn: async () => {
      const response = await apiClient.delete(
        `/galery/image/delete/${galleryImageId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["galeryImage"],
      });
    },
  });
}
