import { FaCheck } from "react-icons/fa";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import { useEffect, useRef } from "react";
import type { GaleryTitleType } from "../../../Types/types";
import CustomInputErrorMsg from "../../CustomElements/CustomInputErrorMsg";
import UsePutMutation from "../../../Hooks/UsePutMutation";

type Props = {
  galeryTitle: GaleryTitleType;
};

export default function GaleryEditItem({ galeryTitle }: Props) {
  const { editingGaleryTitleObj, setEditingGaleryTitleObj } =
    useContextProvider();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const putMutation = UsePutMutation<GaleryTitleFormType>({
    url: `http://localhost:8000/galery/update/${editingGaleryTitleObj?._id}`,
    queryKey: "galeryTitles",
    reset,
    setEditingGaleryTitleObj,
    galeryTitle,
  });

  function onSubmit(data: GaleryTitleFormType) {
    // console.log(data);
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

        <CustomInputErrorMsg errors={errors} registerName="galeryTitle" />
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
