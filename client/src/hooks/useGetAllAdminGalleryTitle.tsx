import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";
import { useSearchContext } from "./useSearchContext";

export default function useGetAllAdminGalleryTitle(pathname: string) {
  const { searchQuery } = useSearchContext();
  const encodedSearchQuery = encodeURIComponent(searchQuery || "");

  return useQuery<GalleryTitleType[]>({
    queryKey: ["adminGalleryTitles", encodedSearchQuery, pathname],
    queryFn: async () => {
      const response = await apiClient.get(
        `${pathname}?search=${encodedSearchQuery}`,
      );
      return response.data.data;
    },
  });
}
