import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { GalleryTitleType, ResponseWithDataType } from "../types/types";

export default function useMyGaleryTitleGet() {
  return useQuery<GalleryTitleType[]>({
    queryKey: ["galeryTitle"],
    queryFn: async () => {
      const response =
        await apiClient.get<ResponseWithDataType<GalleryTitleType[]>>(
          "/galery/title/get",
        );
      return response.data.data;
    },
  });
}
