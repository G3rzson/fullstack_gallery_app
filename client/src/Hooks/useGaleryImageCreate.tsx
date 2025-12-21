import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType, GaleryImageType } from "../Types/types";

export default function useGaleryImageCreate({
  urlParams,
}: {
  urlParams: string | undefined;
}) {
  const queryClient = useQueryClient();

  return useMutation<BackendResponseType<GaleryImageType>, unknown, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await api.post<BackendResponseType<GaleryImageType>>(
        `/api/galery/image/upload/${urlParams}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["galeryImages", urlParams],
      });
    },
  });
}
