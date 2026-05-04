import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { UserObjType } from "../types/types";
import { useSearchContext } from "./useSearchContext";
import { useLocation } from "react-router-dom";

export default function useGetUsers() {
  const pathname = useLocation().pathname;
  const { searchQuery } = useSearchContext();
  const encodedSearchQuery = encodeURIComponent(searchQuery || "");

  return useQuery<UserObjType[]>({
    queryKey: ["users", encodedSearchQuery, pathname],
    queryFn: async () => {
      const response = await apiClient.get(
        `${pathname}?search=${encodedSearchQuery}`,
      );
      return response.data.data;
    },
  });
}
