import { useQuery } from "@tanstack/react-query";
import type { GalleryImageType } from "../types/types";
import { apiClient } from "../setup/apiClient";

export default function useGetAllPublicGaleryImage(id: string) {
  return useQuery<GalleryImageType[]>({
    queryKey: ["galeryImage", id],
    queryFn: async () => {
      const response = await apiClient.get(`/galery/image/public/get/${id}`);
      return response.data.data;
    },
  });
}
