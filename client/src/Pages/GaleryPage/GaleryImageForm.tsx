import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryImagesFormSchema,
  type GaleryImagesFormType,
} from "../../Validation/GaleryImageFormSchema";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import toast from "react-hot-toast";
import axios from "axios";
import type { ResponseType } from "../../Types/types";

export default function GaleryImageForm() {
  const { "url-params": urlParams } = useParams<{ "url-params": string }>();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryImagesFormType>({
    resolver: zodResolver(galeryImagesFormSchema),
  });

  const postMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post<ResponseType>(
        `galery/${urlParams}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Képek sikeresen feltöltve!");
      queryClient.invalidateQueries({
        queryKey: [`galeryImages-${urlParams}`],
      });

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

  function onSubmit(data: GaleryImagesFormType) {
    // Build FormData from the FileList (append all files)
    const formData = new FormData();
    if (data.galeryImages && data.galeryImages.length > 0) {
      Array.from(data.galeryImages).forEach((f) =>
        formData.append("galeryImages", f)
      );
    }

    postMutation.mutate(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 m-4 dark:bg-zinc-700 bg-zinc-200 p-4 rounded-lg"
    >
      <div className="relative">
        <input
          {...register("galeryImages")}
          className="bg-white text-black border-none outline-0 p-2 rounded w-full"
          type="file"
          multiple
        />

        {errors["galeryImages"] && (
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
            {String(errors["galeryImages"]?.message)}
          </p>
        )}
      </div>

      <button
        className="cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-4 disabled:bg-zinc-500 disabled:hover:bg-zinc-500 dark:bg-green-800 dark:hover:bg-green-600 dark:text-zinc-100 bg-green-300 hover:bg-green-500 text-zinc-900 p-2 rounded duration-300"
        type="submit"
        disabled={postMutation.isPending}
      >
        Képek hozzáadása
      </button>
    </form>
  );
}
