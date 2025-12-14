import { FaCheck } from "react-icons/fa";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGaleryTitleUpdate } from "../../../Hooks/useGaleryTitleUpdate";

export default function GaleryUpdateForm() {
  const { editingGaleryTitleObj, setEditingGaleryTitleObj } =
    useContextProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
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
    // Beallítja az aktuális galéria címet az input mezőbe és fókuszál rá
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

  const updateGaleryTitle = useGaleryTitleUpdate({
    galeryTitleId: editingGaleryTitleObj?._id,
  });

  function onSubmit(data: GaleryTitleFormType) {
    //console.log(data);
    updateGaleryTitle.mutate(data, {
      onSuccess: (data) => {
        const oldUrl = editingGaleryTitleObj?.url;
        const newUrl = data.data?.url;
        if (oldUrl && newUrl && location.pathname === `/galery/${oldUrl}`) {
          navigate(`/galery/${newUrl}`, { replace: true });
        }
        setEditingGaleryTitleObj(null);
        reset();
      },
    });
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
        disabled={updateGaleryTitle.isPending}
        type="submit"
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <FaCheck color="green" />
      </button>
    </form>
  );
}
