import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryImageType } from "../Types/types";
import { useContextProvider } from "./useContextProvider";
import type { AxiosError } from "axios";
type Props = {
  urlParams: string | undefined;
};

export default function useGaleryImageGet({ urlParams }: Props) {
  const { isAuthLoading } = useContextProvider();

  return useQuery<BackendResponseType<GaleryImageType[]>>({
    queryKey: ["galeryImages", urlParams],
    queryFn: async () => {
      const res = await api.get<BackendResponseType<GaleryImageType[]>>(
        `/api/galery/image/get/${urlParams}`
      );
      return res.data;
    },

    retry: (failureCount, error) => {
      const status = (error as AxiosError | undefined)?.response?.status;
      if (status === 404) return false;
      return failureCount < 2;
    },

    enabled: !!urlParams && !isAuthLoading,
  });
}
