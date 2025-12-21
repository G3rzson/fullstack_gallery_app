import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryImageType } from "../Types/types";
type Props = {
  urlParams: string | undefined;
};

export default function useGaleryImageGet({ urlParams }: Props) {
  return useQuery<BackendResponseType<GaleryImageType[]>>({
    queryKey: ["galeryImages", urlParams],
    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryImageType[]>>(
        `/api/galery/image/get/${urlParams}`
      );
      return res.data;
    },

    // csak akkor fusson le, ha van urlParams
    enabled: !!urlParams,
  });
}
