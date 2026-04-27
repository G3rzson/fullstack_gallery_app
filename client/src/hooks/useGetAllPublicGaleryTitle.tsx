import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";

export default function useGetAllPublicGaleryTitle() {
  return useQuery<GalleryTitleType[]>({
    queryKey: ["galeryTitlePublic"],
    queryFn: async () => {
      const response = await apiClient.get("/galery/title/public/get");
      return response.data.data;
    },
  });
}
