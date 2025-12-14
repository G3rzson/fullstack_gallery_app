import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import { FaFolderPlus } from "react-icons/fa";
import useGaleryTitleCreate from "../../../Hooks/useGaleryTitleCreate";

export default function GaleryTitleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
  });

  const postMutation = useGaleryTitleCreate();

  function onSubmit(data: GaleryTitleFormType) {
    postMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full p-4"
    >
      <div className="relative">
        <input
          {...register("galeryTitle")}
          className="bg-white text-black border-none outline-0 p-2 rounded w-full"
          type="text"
          placeholder="Galéria címe"
          aria-label="Galéria címe"
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
        aria-label="Galéria cím létrehozás"
      >
        Létrehozás <FaFolderPlus />
      </button>
    </form>
  );
}
