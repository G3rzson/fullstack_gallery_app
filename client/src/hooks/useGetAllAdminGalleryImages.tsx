import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryImageType } from "../types/types";

export default function useGetAllAdminGalleryImages(pathname: string) {
  return useQuery<GalleryImageType[]>({
    queryKey: ["adminGalleryImages", pathname],
    queryFn: async () => {
      const response = await apiClient.get(`${pathname}`);
      return response.data.data;
    },
  });
}
