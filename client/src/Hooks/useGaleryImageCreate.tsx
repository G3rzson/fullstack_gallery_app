import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { handleAxiosError } from "../Functions/handleAxiosError";
import toast from "react-hot-toast";
import type { ResponseType } from "../Types/types";

type Props = {
  urlParams: string | undefined;
};

export default function useGaleryImageCreate({ urlParams }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<ResponseType>(
        `galery/${urlParams}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`galeryImages-${urlParams}`],
      });

      toast.success(data.message || "Képek sikeresen feltöltve!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
