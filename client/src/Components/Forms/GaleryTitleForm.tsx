import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../../Validation/GaleryTitleFormSchema";
import InputField from "./Elements/InputField";
import SubmitBtn from "./Elements/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

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
      className="flex flex-col gap-6 w-80 mx-auto dark:bg-zinc-700 bg-zinc-200 p-4 rounded-lg"
    >
      <InputField
        register={register}
        errors={errors}
        placeholder="Galéria címe"
      />

      <SubmitBtn isSubmitting={isSubmitting || addMutation.isPending}>
        Létrehozás
      </SubmitBtn>
    </form>
  );
}
