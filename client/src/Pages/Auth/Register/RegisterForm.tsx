import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  type RegisterFormType,
} from "../../../Validation/RegisterFormSchema";
import { useForm } from "react-hook-form";
import Paragraph from "../Paragraph";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "../../../Types/types";

export default function RegisterForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const postMutation = useMutation({
    mutationFn: async (data: RegisterFormType) => {
      const response = await api.post<ResponseType>("/auth/register", data);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Sikeres bejelentkezés!");
      queryClient.invalidateQueries({ queryKey: ["register"] });
      reset();
    },

    onError: (error) => {
      toast.error(
        `${
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Ismeretlen hiba történt!"
            : "Ismeretlen hiba történt!"
        }`
      );
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data: RegisterFormType) =>
        postMutation.mutate(data)
      )}
      className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg w-80 mx-auto p-4"
    >
      <div className="relative">
        <input
          {...register("username")}
          className="bg-white text-black border-none outline-0 p-2 rounded w-full"
          type="text"
          placeholder="Felhasználónév"
        />

        {errors["username"] && (
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
            {String(errors["username"]?.message)}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("email")}
          className="bg-white text-black border-none outline-0 p-2 rounded w-full"
          type="text"
          placeholder="Email"
        />

        {errors["email"] && (
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
            {String(errors["email"]?.message)}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("password")}
          className="bg-white text-black border-none outline-0 p-2 rounded w-full"
          type="password"
          placeholder="Jelszó"
        />

        {errors["password"] && (
          <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
            {String(errors["password"]?.message)}
          </p>
        )}
      </div>

      <button
        className="cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-4 disabled:bg-zinc-500 disabled:hover:bg-zinc-500 dark:bg-green-800 dark:hover:bg-green-600 dark:text-zinc-100 bg-green-300 hover:bg-green-500 text-zinc-900 p-2 rounded duration-300"
        type="submit"
        disabled={postMutation.isPending}
      >
        Regisztráció
      </button>

      <Paragraph path="/auth/login" text="Jelentkezz be!">
        Van már fiókod?
      </Paragraph>
    </form>
  );
}
