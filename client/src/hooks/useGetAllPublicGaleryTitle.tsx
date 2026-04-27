import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType, ResponseWithDataType } from "../types/types";

export default function useGetAllPublicGaleryTitle() {
  return useQuery<GalleryTitleType[]>({
    queryKey: ["galeryTitlePublic"],
    queryFn: async () => {
      const response = await apiClient.get<
        ResponseWithDataType<GalleryTitleType[]>
      >("/galery/title/public/get");
      return response.data.data;
    },
  });
}
