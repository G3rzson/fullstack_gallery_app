import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGalleryTitleGetOne(id: string) {
  return useQuery({
    queryKey: ["galeryTitle", id],
    queryFn: async () => {
      const response = await apiClient.get(`/galery/title/get/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}
