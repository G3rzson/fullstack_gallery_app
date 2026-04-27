import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";

export default function useMyGaleryTitleGet() {
  return useQuery<GalleryTitleType[]>({
    queryKey: ["galeryTitle"],
    queryFn: async () => {
      const response = await apiClient.get("/galery/title/get");
      return response.data.data;
    },
  });
}
