import { FaCheck } from "react-icons/fa";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import { useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import type { GaleryTitleType, ResponseType } from "../../../Types/types";
import { useLocation, useNavigate } from "react-router-dom";

export default function GaleryEditItem() {
  const { editingGaleryTitleObj, setEditingGaleryTitleObj } =
    useContextProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
    defaultValues: {
      galeryTitle: editingGaleryTitleObj?.galeryTitle || "",
    },
  });

  useEffect(() => {
    if (editingGaleryTitleObj?.galeryTitle) {
      reset({ galeryTitle: editingGaleryTitleObj.galeryTitle });
    }

    const input = inputRef.current;
    if (input) {
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, [editingGaleryTitleObj, reset]);

  const putMutation = useMutation({
    mutationFn: async (data: GaleryTitleFormType) => {
      const response = await api.put<ResponseType<GaleryTitleType>>(
        `/galery/update/${editingGaleryTitleObj?._id}`,
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Sikeres átnevezés!");
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
      const oldUrl = editingGaleryTitleObj?.url;
      const newUrl = data.data?.url;
      // If currently on the edited gallery's route, navigate to the new URL
      if (oldUrl && newUrl) {
        const currentPath = location.pathname;
        if (currentPath === `/galery/${oldUrl}`) {
          navigate(`/galery/${newUrl}`, { replace: true });
        }
      }
      setEditingGaleryTitleObj(null);
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

  function onSubmit(data: GaleryTitleFormType) {
    //console.log(data);
    putMutation.mutate(data);
  }

  return (
    <form
      className="p-4 w-full flex flex-row gap-2 dark:bg-zinc-700 bg-zinc-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative">
        <input
          {...register("galeryTitle")}
          ref={(e) => {
            register("galeryTitle").ref(e);
            inputRef.current = e;
          }}
          type="text"
          className="w-full dark:text-zinc-100 text-zinc-900 border-none outline-0"
        />

        {errors["galeryTitle"] && (
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
            {String(errors["galeryTitle"]?.message)}
          </p>
        )}
      </div>
      <button
        disabled={putMutation.isPending}
        type="submit"
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <FaCheck color="green" />
      </button>
    </form>
  );
}
