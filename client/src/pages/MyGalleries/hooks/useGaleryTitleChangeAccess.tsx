import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGaleryTitleChangeAccess(galleryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { isPublic: boolean }) => {
      const response = await apiClient.put(
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
