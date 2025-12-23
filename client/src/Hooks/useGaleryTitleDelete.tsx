import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType } from "../Types/types";

export default function useGaleryTitleDelete(galeryTitleID: string) {
  const queryClient = useQueryClient();

  return useMutation<BackendResponseType>({
    mutationFn: async () => {
      const response = await api.delete<BackendResponseType>(
        `/api/galery/title/delete/${galeryTitleID}`
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
    },
  });
}
