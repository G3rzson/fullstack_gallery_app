import { FaCheck } from "react-icons/fa";
import { useContextProvider } from "../../Hooks/UseContextProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../Validation/GaleryTitleFormSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { GaleryTitleType } from "../../Types/types";

type Props = {
  galeryTitle: GaleryTitleType;
};

export default function GaleryEditItem({ galeryTitle }: Props) {
  const { editingGaleryTitleObj, setEditingGaleryTitleObj } =
    useContextProvider();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const editMutation = useMutation({
    mutationFn: (data: GaleryTitleFormType) =>
      axios.put(
        `http://localhost:8000/galery/update/${editingGaleryTitleObj?._id}`,
        data
      ),

    onSuccess: (response) => {
      toast.success("Sikeresen frissítve!");
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
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

  function onSubmit(data: GaleryTitleFormType) {
    // console.log(data);
    editMutation.mutate(data);
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
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-3 left-0">
            {String(errors["galeryTitle"]?.message)}
          </p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <FaCheck color="green" />
      </button>
    </form>
  );
}
