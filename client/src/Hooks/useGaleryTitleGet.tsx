import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";
import { useContextProvider } from "./useContextProvider";

export default function useGaleryTitleGet(mode: "public" | "private") {
  const { userObj, isAuthLoading } = useContextProvider();
  const username = userObj?.username ?? "guest";

  return useQuery<BackendResponseType<GaleryTitleType[]>>({
    queryKey:
      mode === "public"
        ? ["galeryTitles", "public"]
        : ["galeryTitles", "private", username],
    enabled: mode === "public" ? true : !isAuthLoading && !!userObj,

    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryTitleType[]>>(
        `/api/galery/title/${mode}`
      );
      return res.data;
    },
  });
}
