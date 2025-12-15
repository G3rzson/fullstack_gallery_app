import toast from "react-hot-toast";
import { handleAxiosError } from "../Functions/handleAxiosError";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "../Types/types";

type Props = {
  imageId: string;
  urlParams: string | undefined;
};

export default function useGaleryImageDelete({ imageId, urlParams }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete<ResponseType>(
        `http://localhost:8000/galery/image/delete/${imageId}`
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["galeryImages", urlParams],
      });

      toast.success(data.message || "Sikeresen törölve!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
