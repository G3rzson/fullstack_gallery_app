import { useForm } from "react-hook-form";
import { useContextProvider } from "../../Hooks/useContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type LoginFormType,
} from "../../ZodSchemas/LoginFormSchema";
import useAuthLogin from "../../Hooks/useAuthLogin";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Components/GlobalComponents/InputField";
import InputErrorMsg from "../../Components/GlobalComponents/InputError";
import SubmitBtn from "../../Components/GlobalComponents/SubmitBtn";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../Utils/handleAxiosError";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAccessToken, setUser } = useContextProvider();
  const { mutateAsync, isPending } = useAuthLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(data: LoginFormType) {
    try {
      const res = await mutateAsync(data);
      reset();
      setAccessToken(res.data.accessToken);
      setUser(res.data.username);
      toast.success(res.message ?? "Sikeres bejelentkezés!");
      navigate("/my-galery-titles", { replace: true });
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">Bejelentkezés</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg sm:w-80 w-full mx-auto p-4"
      >
        <div className="relative">
          <InputField
            register={register}
            registerName="username"
            type="text"
            title="Felhasználónév"
            disabled={isPending}
          />

          <InputErrorMsg errorMsg={errors["username"]?.message} />
        </div>

        <div className="relative">
          <InputField
            register={register}
            registerName="password"
            type={showPassword ? "text" : "password"}
            title="Jelszó"
            disabled={isPending}
          />

          <InputErrorMsg errorMsg={errors["password"]?.message} />

          <button
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
            aria-label={showPassword ? "Rejtett jelszó" : "Mutat jelszó"}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-800 cursor-pointer"
          >
            <abbr title={showPassword ? "Jelszót elrejt" : "Jelszót mutat"}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </abbr>
          </button>
        </div>

        <SubmitBtn disabled={isPending} ariaLabel="Regisztráció">
          Bejelentkezés
        </SubmitBtn>

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
