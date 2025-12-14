import { Link } from "react-router-dom";
import useAuthRegister from "../../../Hooks/useAuthRegister";
import {
  registerFormSchema,
  type RegisterFormType,
} from "../../../Validation/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const postMutation = useAuthRegister();

  function onSubmit(data: RegisterFormType) {
    postMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">Regisztráció</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg w-80 mx-auto p-4"
      >
        <div className="relative">
          <input
            {...register("username")}
            className="bg-white text-black border-none outline-0 p-2 rounded w-full"
            type="text"
            placeholder="Felhasználónév"
            aria-label="Felhasználónév"
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
            aria-label="Email"
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
            aria-label="Jelszó"
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
          aria-label="Regisztráció"
        >
          Regisztráció
        </button>

        <p className="flex items-center gap-4">
          Van már fiókod?
          <Link
            className="dark:text-amber-200 text-amber-500 hover:dark:text-amber-300 hover:text-amber-600 duration-300"
            to="/auth/login"
          >
            Jelentkezz be!
          </Link>
        </p>
      </form>
    </div>
  );
}
