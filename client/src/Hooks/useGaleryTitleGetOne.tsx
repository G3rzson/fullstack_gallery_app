import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryTitleType } from "../Types/types";

export function useGaleryTitleGetOne(galeryTitleID?: string) {
  return useQuery<BackendResponseType<GaleryTitleType>>({
    queryKey: ["galeryTitle", galeryTitleID],
    enabled: !!galeryTitleID,
    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryTitleType>>(
        `/api/galery/title/${galeryTitleID}`
      );
      return res.data;
    },
  });
}
