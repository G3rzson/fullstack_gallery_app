import type { ResponseType, GaleryTitleType } from "../../../Types/types";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

type Props = {
  galeryTitle: GaleryTitleType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteGaleryBtn({ galeryTitle, setIsOpen }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return api.delete<ResponseType>(
        `http://localhost:8000/galery/delete/${galeryTitle._id}`
      );
    },

    onSuccess: () => {
      toast.success("Sikeresen törölve!");
      queryClient.invalidateQueries({
        queryKey: ["galeryTitles"],
      });
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    },
  });

  function handleClick() {
    deleteMutation.mutate();

    setIsOpen(false);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
    >
      Törlés <FaTrash color="orangered" />
    </button>
  );
}
