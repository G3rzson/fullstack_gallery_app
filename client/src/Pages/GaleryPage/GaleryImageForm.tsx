import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryImagesFormSchema,
  type GaleryImagesFormType,
} from "../../Validation/GaleryImageFormSchema";
import InputField from "../../Components/CustomElements/CustomInputField";
import SubmitBtn from "../../Components/CustomElements/CustomSubmitBtn";
import CustomInputErrorMsg from "../../Components/CustomElements/CustomInputErrorMsg";
import { useParams } from "react-router-dom";
import UsePostMutation from "../../Hooks/UsePostMutation";

export default function GaleryImageForm() {
  const { "url-params": urlParams } = useParams<{ "url-params": string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GaleryImagesFormType>({
    resolver: zodResolver(galeryImagesFormSchema),
  });

  const postMutation = UsePostMutation<GaleryImagesFormType>({
    url: `http://localhost:8000/galery/${urlParams}`,
    queryKey: `galeryImages-${urlParams}`,
    reset,
    axiosConfig: {
      headers: { "Content-Type": "multipart/form-data" },
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
        <InputField
          register={register}
          errors={errors}
          placeholder="Képek hozzáadása"
          type="file"
          registerName="galeryImages"
          multiple={true}
        />

        <CustomInputErrorMsg errors={errors} registerName="galeryImages" />
      </div>

      <SubmitBtn isSubmitting={isSubmitting || postMutation.isPending}>
        Képek hozzáadása
      </SubmitBtn>
    </form>
  );
}
