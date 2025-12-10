import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  queryKey: string;
  url: string;
  withNavigation?: boolean;
};

export default function UseDeleteMutation({
  queryKey,
  url,
  withNavigation,
}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete(url);
    },

    onSuccess: () => {
      toast.success("Sikeresen törölve!");
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      if (withNavigation) {
        navigate("/");
      }
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    },
  });
}
