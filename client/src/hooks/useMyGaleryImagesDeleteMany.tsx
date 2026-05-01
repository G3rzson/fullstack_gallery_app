import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BaseResponseType } from "../types/types";
import { apiClient } from "../setup/apiClient";
import { useLocation } from "react-router-dom";

export default function useMyGaleryImagesDeleteMany() {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  return useMutation<BaseResponseType, unknown, string[]>({
    mutationFn: async (ids: string[]) => {
      const response = await apiClient.post(`${pathname}/delete-many`, { ids });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["galleryImages"],
      });
    },
  });
}
