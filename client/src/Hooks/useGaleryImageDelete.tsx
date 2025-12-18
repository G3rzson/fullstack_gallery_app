import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";
import { api } from "../Axios/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  imageId: string;
  urlParams: string | undefined;
};

export default function useGaleryImageDelete({ imageId, urlParams }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/api/galery/image/delete/${imageId}`);
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
