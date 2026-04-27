import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";

export default function useMyGaleryTitleDelete(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType>({
    mutationFn: async () => {
      const response = await apiClient.delete(
        `/galery/title/delete/${galleryId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitle"] });
    },
  });
}
