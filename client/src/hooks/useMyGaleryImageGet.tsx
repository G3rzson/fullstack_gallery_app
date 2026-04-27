import { useQuery } from "@tanstack/react-query";
import type { GalleryImageType, ResponseWithDataType } from "../types/types";
import { apiClient } from "../setup/apiClient";

export default function useMyGaleryImageGet(id: string) {
  return useQuery<GalleryImageType[]>({
    queryKey: ["galeryImage", id],
    queryFn: async () => {
      const response = await apiClient.get<
        ResponseWithDataType<GalleryImageType[]>
      >(`/galery/image/get/${id}`);
      return response.data.data;
    },
  });
}
