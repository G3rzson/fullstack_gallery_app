import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { UserObjType } from "../types/types";
import { useSearchContext } from "./useSearchContext";

export default function useGetAllUsers(pathname: string) {
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
