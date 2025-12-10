import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FieldValues, UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { GaleryTitleType } from "../Types/types";

type Props<T extends FieldValues> = {
  url: string;
  queryKey: string;
  reset: UseFormReset<T>;
  setEditingGaleryTitleObj: React.Dispatch<
    React.SetStateAction<GaleryTitleType | null>
  >;
  galeryTitle: GaleryTitleType;
};

export default function UsePutMutation<T extends FieldValues>({
  url,
  queryKey,
  reset,
  setEditingGaleryTitleObj,
  galeryTitle,
}: Props<T>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: T) => axios.put(url, data),

    onSuccess: (response) => {
      toast.success("Sikeresen frissítve!");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setEditingGaleryTitleObj(null);
      reset();

      // Ha az URL változott és a felhasználó ezen a galérián van, navigálunk az új URL-re
      const newUrl = response.data?.data?.url;
      const oldUrl = galeryTitle.url;
      if (newUrl && oldUrl && newUrl !== oldUrl) {
        // Ellenőrizzük, hogy az aktuális oldalon vagyunk-e ezen a galérián
        if (location.pathname === `/galery/${oldUrl}`) {
          navigate(`/galery/${newUrl}`, { replace: true });
        }
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
