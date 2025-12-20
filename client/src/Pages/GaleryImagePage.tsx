import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import {
  galeryImagesFormSchema,
  type GaleryImagesFormType,
} from "../ZodSchemas/GaleryImageFormSchema";
import useGaleryImageCreate from "../Hooks/useGaleryImageCreate";
import ImageSlider from "../Components/GaleryPageComp/ImageSlider";
import { useContextProvider } from "../Hooks/useContextProvider";

export default function GaleryImagePage() {
  const params = useParams();
  const urlParams = params["url-params"]!;
  const { user } = useContextProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryImagesFormType>({
    resolver: zodResolver(galeryImagesFormSchema),
  });

  // galéria kép feltöltés deklaráció
  const uploadImageMutation = useGaleryImageCreate({ urlParams: urlParams });

  // űrlap elküldése
  function onSubmit(data: GaleryImagesFormType) {
    // Build FormData from the FileList (append all files)
    const formData = new FormData();
    if (data.galeryImages && data.galeryImages.length > 0) {
      Array.from(data.galeryImages).forEach((f) =>
        formData.append("galeryImages", f)
      );
    }

    uploadImageMutation.mutate(formData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  /* ----------------------------------------------------
     | todo : max 10 képet lehessen egyszerre feltölteni   |
     ------------------------------------------------------ */

  return (
    <div className="flex flex-1 flex-col">
      {user && (
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
              id="galeryImages"
              accept="image/*"
              aria-label="Képek input mezője"
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
            disabled={uploadImageMutation.isPending}
          >
            Képek hozzáadása
          </button>
        </form>
      )}

      <ImageSlider />
    </div>
  );
}
