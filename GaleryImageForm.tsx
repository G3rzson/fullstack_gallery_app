import toast from "react-hot-toast";
import InputField from "./client/src/Components/Forms/Elements/InputField";
import SubmitBtn from "./client/src/Components/Forms/Elements/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryImagesFormSchema,
  type GaleryImagesFormType,
} from "./client/src/Validation/GaleryImageFormSchema";

type Props = {
  url: string | undefined;
};

export default function GaleryImageForm({ url }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GaleryImagesFormType>({
    resolver: zodResolver(galeryImagesFormSchema),
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (formData: FormData) =>
      axios.post(`http://localhost:8000/galery/${url}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    onSuccess: () => {
      toast.success("Sikeresen létrehozva!");
      queryClient.invalidateQueries({ queryKey: [`galeryImages-${url}`] });
      reset();
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
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

    addMutation.mutate(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 m-4 dark:bg-zinc-700 bg-zinc-200 p-4 rounded-lg"
    >
      <InputField
        register={register}
        errors={errors}
        placeholder="Képek hozzáadása"
        type="file"
        registerName="galeryImages"
        multiple={true}
      />

      <SubmitBtn isSubmitting={isSubmitting || addMutation.isPending}>
        Képek hozzáadása
      </SubmitBtn>
    </form>
  );
}
