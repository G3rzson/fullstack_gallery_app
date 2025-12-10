import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosRequestConfig } from "axios";
import type { FieldValues, UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

type Props<T extends FieldValues> = {
  url: string;
  queryKey: string;
  reset: UseFormReset<T>;
  axiosConfig?: AxiosRequestConfig;
};

export default function UsePostMutation<T extends FieldValues>({
  url,
  queryKey,
  reset,
  axiosConfig,
}: Props<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T | FormData) => axios.post(url, data, axiosConfig),

    onSuccess: () => {
      toast.success("Sikeresen létrehozva!");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      reset();
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    },
  });
}
