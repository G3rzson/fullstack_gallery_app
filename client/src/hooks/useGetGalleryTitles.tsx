import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";
import { useSearchContext } from "./useSearchContext";
import { useLocation } from "react-router-dom";

export default function useGetGalleryTitles() {
  const pathname = useLocation().pathname;
  const { searchQuery } = useSearchContext();
  const encodedSearchQuery = encodeURIComponent(searchQuery || "");

  return useQuery<GalleryTitleType[]>({
    queryKey: ["galleryTitles", encodedSearchQuery, pathname],
    queryFn: async () => {
      const response = await apiClient.get(
        `${pathname}?search=${encodedSearchQuery}`,
      );
      return response.data.data;
    },
  });
}
