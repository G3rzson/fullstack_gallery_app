import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
type Props = {
  urlParams: string | undefined;
};

export default function useGaleryImageGet({ urlParams }: Props) {
  return useQuery({
    queryKey: ["galeryImages", urlParams],
    queryFn: async () => {
      const res = await api.get(`/api/galery/image/get/${urlParams}`);
      return res.data;
    },

    // csak akkor fusson le, ha van urlParams
    enabled: !!urlParams,
  });
}
