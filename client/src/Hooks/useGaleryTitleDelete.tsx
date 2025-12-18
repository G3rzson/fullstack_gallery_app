import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";

type Props = {
  galeryTitleId: string;
};

export default function useGaleryTitleDelete({ galeryTitleId }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        `/api/galery/title/delete/${galeryTitleId}`
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
