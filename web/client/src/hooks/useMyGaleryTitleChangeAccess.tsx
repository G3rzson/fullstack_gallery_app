import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";
import { useLocation } from "react-router-dom";

export default function useGaleryTitleChangeAccess(galleryId: string) {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType, unknown, { isPublic: boolean }>({
    mutationFn: async (data: { isPublic: boolean }) => {
      const response = await apiClient.put(`${pathname}/${galleryId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryTitles"] });
    },
  });
}
