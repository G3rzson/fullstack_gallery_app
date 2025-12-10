import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import InputField from "../../CustomElements/CustomInputField";
import SubmitBtn from "../../CustomElements/CustomSubmitBtn";
import { FaFolderPlus } from "react-icons/fa";
import CustomInputErrorMsg from "../../CustomElements/CustomInputErrorMsg";
import UsePostMutation from "../../../Hooks/UsePostMutation";

export default function GaleryTitleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
  });

  const postMutation = UsePostMutation<GaleryTitleFormType>({
    url: "http://localhost:8000/galery/create",
    queryKey: "galeryTitles",
    reset,
  });

  function onSubmit(data: GaleryTitleFormType) {
    // console.log(data);
    postMutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full p-4"
    >
      <div className="relative">
        <InputField
          register={register}
          errors={errors}
          placeholder="Galéria címe"
          type="text"
          registerName="galeryTitle"
        />
        <CustomInputErrorMsg errors={errors} registerName="galeryTitle" />
      </div>

      <SubmitBtn isSubmitting={isSubmitting || postMutation.isPending}>
        Létrehozás
        <FaFolderPlus />
      </SubmitBtn>
    </form>
  );
}
