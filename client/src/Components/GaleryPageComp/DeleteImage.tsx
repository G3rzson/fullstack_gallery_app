import { FaTrash } from "react-icons/fa";
import type { GaleryImagesType, ResponseType } from "../../Types/types";
import api from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  images: GaleryImagesType[];
  index: number;
  urlParams: string | undefined;
};

export default function DeleteImage({ images, index, urlParams }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return api.delete<ResponseType>(
        `http://localhost:8000/galery/image/delete/${images[index]._id}`
      );
    },

    onSuccess: () => {
      toast.success("Sikeresen törölve!");
      queryClient.invalidateQueries({
        queryKey: [`galeryImages-${urlParams}`],
      });
      if (images.length === 0) {
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

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900/70 w-full rounded-b-xl flex items-center justify-center gap-4 p-4">
      <button
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
        className="cursor-pointer flex items-center gap-2 disabled:cursor-not-allowed"
      >
        Kép törlése <FaTrash color="orangered" />
      </button>
    </div>
  );
}
