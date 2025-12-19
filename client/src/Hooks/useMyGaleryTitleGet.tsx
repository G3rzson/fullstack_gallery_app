import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";
import { useContextProvider } from "./useContextProvider";

export default function useMyGaleryTitleGet() {
  const { user, isAuthLoading } = useContextProvider();

  return useQuery<BackendResponseType<GaleryTitleType[]>>({
    queryKey: ["galeryTitles", user ?? "guest"],
    enabled: !isAuthLoading,
    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryTitleType[]>>(
        "/api/galery/title/me/get"
      );
      return res.data;
    },
  });
}
