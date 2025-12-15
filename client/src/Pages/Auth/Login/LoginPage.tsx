import { useForm } from "react-hook-form";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type LoginFormType,
} from "../../../Validation/LoginFormSchema";
import useAuthLogin from "../../../Hooks/useAuthLogin";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { setAccessToken, setUser } = useContextProvider();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  // bejelenkezés hook deklarálása
  const loginUserMutation = useAuthLogin();

  // űrlap elküldése
  function onSubmit(data: LoginFormType) {
    loginUserMutation.mutate(data, {
      onSuccess: (data) => {
        setAccessToken(data.data.accessToken);
        setUser(data.data.user);
        reset();
        navigate("/");
      },
    });
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">Bejelentkezés</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg w-80 mx-auto p-4"
      >
        <div className="relative">
          <input
            {...register("username")}
            className="bg-white text-black border-none outline-0 p-2 rounded w-full"
            type="text"
            id="username"
            placeholder="Felhasználónév"
            aria-label="Felhasználónév"
            autoFocus
          />

          {errors["username"] && (
            <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
              {String(errors["username"]?.message)}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            {...register("password")}
            className="bg-white text-black border-none outline-0 p-2 rounded w-full"
            type="password"
            id="password"
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
          disabled={loginUserMutation.isPending}
          aria-label="Bejelentkezés"
        >
          Bejelentkezés
        </button>

        <p className="flex items-center gap-4">
          Még nincs fiókod?
          <Link
            className="dark:text-amber-200 text-amber-500 hover:dark:text-amber-300 hover:text-amber-600 duration-300"
            to="/auth/register"
          >
            Regisztrálj!
          </Link>
        </p>
      </form>
    </div>
  );
}
