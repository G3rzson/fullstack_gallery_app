import { useQuery } from "@tanstack/react-query";
import type { GalleryImageType } from "../types/types";
import { apiClient } from "../setup/apiClient";
import { useUserContext } from "../hooks/useUserContext";

export default function useMyGaleryImageGet(id: string) {
  const { userObj } = useUserContext();
  return useQuery<GalleryImageType[]>({
    queryKey: ["galeryImage", id],
    queryFn: async () => {
      const response = await apiClient.get(`/galery/image/get/${id}`);
      return response.data.data;
    },
    enabled: !!userObj,
  });
}
