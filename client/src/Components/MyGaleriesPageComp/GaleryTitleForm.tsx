import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFolderPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useGaleryTitleCreate from "../../Hooks/useGaleryTitleCreate";

import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../ZodSchemas/GaleryTitleFormSchema";
import { handleAxiosError } from "../../Utils/handleAxiosError";
import InputField from "../GlobalComponents/InputField";
import InputError from "../GlobalComponents/InputError";
import SubmitBtn from "../GlobalComponents/SubmitBtn";

export default function GaleryTitleForm() {
  const { mutateAsync, isPending } = useGaleryTitleCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
  });

  async function onSubmit(data: GaleryTitleFormType) {
    try {
      const res = await mutateAsync(data);
      reset();
      toast.success(res.message ?? "Galéria létrehozva!");
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg sm:w-80 w-full mx-auto p-4"
    >
      <div className="relative">
        <InputField
          register={register}
          registerName="galeryTitle"
          type="text"
          title="Galéria címe"
          disabled={isPending}
        />

        <InputError errorMsg={errors["galeryTitle"]?.message} />
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register("isPrivate")}
          className="cursor-pointer"
          type="checkbox"
          id="isPrivate"
        />
        <label className="cursor-pointer select-none" htmlFor="isPrivate">
          Legyen privát.
        </label>
      </div>

      <SubmitBtn disabled={isPending} ariaLabel="Űrlap beküldése">
        Létrehozás <FaFolderPlus />
      </SubmitBtn>
    </form>
  );
}
