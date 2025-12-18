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

export default function GaleryTitleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
  });
  const navigate = useNavigate();

  const postMutation = useGaleryTitleCreate();

  function onSubmit(data: GaleryTitleFormType) {
    //console.log("Submitting form with data:", data);
    postMutation.mutate(data, {
      onSuccess: (data) => {
        //console.log("Form submitted successfully:", data);
        reset();

        navigate(`/galery/${data.data.url}`);
      },
    });
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
          disabled={postMutation.isPending}
        />

        <InputError errors={errors} inputKey="galeryTitle" />
      </div>

      <SubmitBtn disabled={postMutation.isPending} ariaLabel="Űrlap beküldése">
        Létrehozás <FaFolderPlus />
      </SubmitBtn>
    </form>
  );
}
