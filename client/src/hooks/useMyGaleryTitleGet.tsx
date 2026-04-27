import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType } from "../types/types";
import { useUserContext } from "../hooks/useUserContext";

export default function useMyGaleryTitleGet(search: string) {
  const { userObj } = useUserContext();
  return useQuery<GalleryTitleType[]>({
    queryKey: ["galeryTitle", search],
    queryFn: async () => {
      const response = await apiClient.get(
        `/galery/title/get?search=${search}`,
      );
      return response.data.data;
    },
    enabled: !!userObj,
  });
}
