import { api } from "../Axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BackendResponseType } from "../Types/types";

export default function useGaleryImageDelete(
  imageId: string,
  urlParams: string | undefined
) {
  const queryClient = useQueryClient();

  return useMutation<BackendResponseType>({
    mutationFn: async () => {
      const response = await api.delete<BackendResponseType>(
        `/api/galery/image/delete/${imageId}`
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
