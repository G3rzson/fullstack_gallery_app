import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../ZodSchemas/GaleryTitleFormSchema";
import { FaFolderPlus } from "react-icons/fa";
import useGaleryTitleCreate from "../../../Hooks/useGaleryTitleCreate";
import { useNavigate } from "react-router-dom";
import InputField from "../../GlobalComponents/InputField";
import InputError from "../../GlobalComponents/InputError";
import SubmitBtn from "../../GlobalComponents/SubmitBtn";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../Utils/handleAxiosError";

export default function GaleryTitleForm() {
  const { mutateAsync, isPending } = useGaleryTitleCreate();
  const navigate = useNavigate();
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
      navigate(`/galery/${res.data.url}`);
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full p-4"
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
