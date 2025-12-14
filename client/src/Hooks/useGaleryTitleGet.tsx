import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { GaleryTitleType, ResponseType } from "../Types/types";

export default function useGaleryTitleGet() {
  return useQuery({
    queryKey: ["galeryTitles"],
    queryFn: async () => {
      const res = await api.get<ResponseType<GaleryTitleType[]>>(
        "/galery/galery-titles/get"
      );
      return res.data;
    },
  });
}
