import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";
import { useLocation } from "react-router-dom";

export default function useMyGaleryTitleDelete(galleryId: string) {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType>({
    mutationFn: async () => {
      const response = await apiClient.delete(`${pathname}/${galleryId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryTitles"] });
    },
  });
}
