import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";
import { useContextProvider } from "./useContextProvider";

export default function usePrivateGaleryTitleGet() {
  const { user, accessToken, isAuthLoading } = useContextProvider();

  return useQuery<BackendResponseType<GaleryTitleType[]>>({
    queryKey: ["galeryTitles", "private", user ?? "guest"],

    enabled: !isAuthLoading && !!user && !!accessToken,

    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryTitleType[]>>(
        "/api/galery/title/private"
      );
      return res.data;
    },
  });
}
