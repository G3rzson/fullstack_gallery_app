import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Functions/handleAxiosError";
import type { ResponseType } from "../Types/types";

type Props = {
  galeryTitleId: string;
};

export default function useGaleryTitleDelete({ galeryTitleId }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete<ResponseType>(
        `http://localhost:8000/galery/delete/${galeryTitleId}`
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });

      toast.success(data.message || "Sikeresen törölve!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
