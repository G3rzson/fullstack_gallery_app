import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";

export default function useGaleryTitleChangeAccess(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { isPublic: boolean }) => {
      const response = await apiClient.put<BaseResponseType>(
        `/galery/title/change-access/${galleryId}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitle"] });
    },
  });
}
