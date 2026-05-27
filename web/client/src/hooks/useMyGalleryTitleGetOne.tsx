import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";

export default function useMyGalleryTitleGetOne(pathname: string) {
  return useQuery<GalleryTitleType>({
    queryKey: ["galleryTitles", pathname],
    queryFn: async () => {
      const response = await apiClient.get(`${pathname}`);
      return response.data.data;
    },
  });
}
