import { useQuery } from "@tanstack/react-query";
import type { GalleryImageType } from "../types/types";
import { apiClient } from "../setup/apiClient";
import { useLocation } from "react-router-dom";

export default function useGetGalleryImages() {
  const pathname = useLocation().pathname;
  return useQuery<GalleryImageType[]>({
    queryKey: ["galleryImages", pathname],
    queryFn: async () => {
      const response = await apiClient.get(`${pathname}`);
      return response.data.data;
    },
  });
}
