import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import type { GaleryImagesType } from "../../Types/types";

type Props = {
  images: GaleryImagesType[];
  index: number;
  url: string | undefined;
};

export default function DeleteImage({ images, index, url }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (_id: string) => {
      return axios.delete(`http://localhost:8000/galery/image/delete/${_id}`);
    },

    onSuccess: () => {
      toast.success("Sikeresen törölve!");
      queryClient.invalidateQueries({ queryKey: [`galeryImages-${url}`] });
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    },
  });

  function handleDelete() {
    // console.log(images[index]);
    deleteMutation.mutate(images[index]._id);
  }

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900/70 w-full rounded-b-xl flex items-center justify-center gap-4 p-4">
      <button
        onClick={handleDelete}
        className="cursor-pointer flex items-center gap-2"
      >
        Kép törlése <FaTrash color="orangered" />
      </button>
    </div>
  );
}
