import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { GaleryTitleType, ResponseType } from "../Types/types";
import toast from "react-hot-toast";
import type { GaleryTitleFormType } from "../Validation/GaleryTitleFormSchema";
import { handleAxiosError } from "../Functions/handleAxiosError";

type Props = { galeryTitleId: string | undefined };

export function useGaleryTitleUpdate({ galeryTitleId }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GaleryTitleFormType) => {
      const response = await api.put<ResponseType<GaleryTitleType>>(
        `/galery/update/${galeryTitleId}`,
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });

      toast.success(data.message || "Sikeres átnevezés!");
    },

    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
}
