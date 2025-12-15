import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { GaleryImageType, ResponseType } from "../Types/types";

type Props = {
  urlParams: string | undefined;
};

export default function useGaleryImageGet({ urlParams }: Props) {
  return useQuery({
    queryKey: ["galeryImages", urlParams],
    queryFn: async () => {
      const res = await api.get<ResponseType<GaleryImageType[]>>(
        `http://localhost:8000/galery/${urlParams}/images`
      );
      return res.data;
    },

    // csak akkor fusson le, ha van urlParams
    enabled: !!urlParams,
  });
}
