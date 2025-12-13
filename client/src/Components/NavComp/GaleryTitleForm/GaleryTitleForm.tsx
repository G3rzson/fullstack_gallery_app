import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import { FaFolderPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import { toast } from "react-hot-toast";
import axios from "axios";
import type { ResponseType } from "../../../Types/types";

export default function GaleryTitleForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
  });

  const postMutation = useMutation({
    mutationFn: async (data: GaleryTitleFormType) => {
      const response = await api.post<ResponseType>(
        "/galery/galery-title/create",
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Galéria létrehozva!");
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
      reset();
    },

    onError: (error) => {
      toast.error(
        `${
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Ismeretlen hiba történt!"
            : "Ismeretlen hiba történt!"
        }`
      );
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data: GaleryTitleFormType) =>
        postMutation.mutate(data)
      )}
      className="flex flex-col gap-6 w-full p-4"
    >
      <div className="relative">
        <input
          {...register("galeryTitle")}
          className="bg-white text-black border-none outline-0 p-2 rounded w-full"
          type="text"
          placeholder="Galéria címe"
        />

        {errors["galeryTitle"] && (
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
            {String(errors["galeryTitle"]?.message)}
          </p>
        )}
      </div>

      <button
        className="cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-4 disabled:bg-zinc-500 disabled:hover:bg-zinc-500 dark:bg-green-800 dark:hover:bg-green-600 dark:text-zinc-100 bg-green-300 hover:bg-green-500 text-zinc-900 p-2 rounded duration-300"
        type="submit"
        disabled={postMutation.isPending}
      >
        Létrehozás
        <FaFolderPlus />
      </button>
    </form>
  );
}
