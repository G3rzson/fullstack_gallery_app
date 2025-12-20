import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";

export default function usePublicGaleryTitleGet() {
  return useQuery<BackendResponseType<GaleryTitleType[]>>({
    queryKey: ["galeryTitles"],

    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryTitleType[]>>(
        "/api/galery/title/public"
      );
      return res.data;
    },
  });
}
