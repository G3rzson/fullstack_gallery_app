import { useQuery } from "@tanstack/react-query";
import type { GalleryImageType } from "../types/types";
import { apiClient } from "../setup/apiClient";

export default function useGetAllMyGalleryImages(pathname: string) {
  return useQuery<GalleryImageType[]>({
    queryKey: ["myGalleryImages", pathname],
    queryFn: async () => {
      const response = await apiClient.get(`${pathname}`);
      return response.data.data;
    },
  });
}
