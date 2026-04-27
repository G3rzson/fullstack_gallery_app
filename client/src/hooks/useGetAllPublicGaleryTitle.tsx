import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";

export default function useGetAllPublicGaleryTitle(search: string) {
  return useQuery<GalleryTitleType[]>({
    queryKey: ["galeryTitlePublic", search],
    queryFn: async () => {
      const response = await apiClient.get(
        `/galery/title/public/get?search=${search}`,
      );
      return response.data.data;
    },
  });
}
