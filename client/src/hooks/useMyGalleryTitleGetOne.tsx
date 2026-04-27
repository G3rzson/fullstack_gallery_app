import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType, ResponseWithDataType } from "../types/types";

export default function useMyGalleryTitleGetOne(id: string) {
  return useQuery<GalleryTitleType>({
    queryKey: ["galeryTitle", id],
    queryFn: async () => {
      const response = await apiClient.get<
        ResponseWithDataType<GalleryTitleType>
      >(`/galery/title/get/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}
