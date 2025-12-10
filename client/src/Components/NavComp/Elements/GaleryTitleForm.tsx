import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../../Validation/GaleryTitleFormSchema";
import InputField from "../../CustomElements/CustomInputField";
import SubmitBtn from "../../CustomElements/CustomSubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFolderPlus } from "react-icons/fa";
import CustomInputErrorMsg from "../../CustomElements/CustomInputErrorMsg";

export default function GaleryTitleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: GaleryTitleFormType) =>
      axios.post("http://localhost:8000/galery/create", data),

    onSuccess: () => {
      toast.success("Sikeresen létrehozva!");
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
      reset();
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    },
  });

  function onSubmit(data: GaleryTitleFormType) {
    // console.log(data);
    addMutation.mutate(data);
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

      <SubmitBtn isSubmitting={isSubmitting || addMutation.isPending}>
        Létrehozás
        <FaFolderPlus />
      </SubmitBtn>
    </form>
  );
}
