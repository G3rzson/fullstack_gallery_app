import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  galeryImagesFormSchema,
  type GaleryImagesFormType,
} from "../ZodSchemas/GaleryImageFormSchema";
import useGaleryImageCreate from "../Hooks/useGaleryImageCreate";
import InputErrorMsg from "../Components/GlobalComponents/InputError";
import SubmitBtn from "../Components/GlobalComponents/SubmitBtn";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";
import InputField from "../Components/GlobalComponents/InputField";

export default function GaleryImageUploadPage() {
  const params = useParams();
  const urlParams = params["url-params"]!;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryImagesFormType>({
    resolver: zodResolver(galeryImagesFormSchema),
  });

  const { mutateAsync, isPending } = useGaleryImageCreate({
    urlParams: urlParams,
  });

  async function onSubmit(data: GaleryImagesFormType) {
    const formData = new FormData();
    if (data.galeryImages && data.galeryImages.length > 0) {
      Array.from(data.galeryImages).forEach((f) =>
        formData.append("galeryImages", f)
      );
    }
    try {
      const res = await mutateAsync(formData);
      navigate(`/galery/${urlParams}`);
      reset();
      toast.success(res.message || "Képek sikeresen feltöltve!");
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <div className="flex flex-col gap-4 flex-1 items-center justify-center p-4">
      <h1 className="text-3xl">Képek feltöltése</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg sm:w-80 w-full mx-auto p-4"
      >
        <div className="relative">
          <InputField
            register={register}
            registerName="galeryImages"
            type="file"
            title="Képek input mezője"
            disabled={isPending}
          />

          <InputErrorMsg errorMsg={errors["galeryImages"]?.message} />
        </div>

        <SubmitBtn disabled={isPending} ariaLabel="Képek hozzáadása">
          Képek hozzáadása
        </SubmitBtn>
      </form>
    </div>
  );
}
