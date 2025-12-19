import { Link, useNavigate } from "react-router-dom";
import useAuthRegister from "../../Hooks/useAuthRegister";
import {
  registerFormSchema,
  type RegisterFormType,
} from "../../ZodSchemas/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../../Components/GlobalComponents/InputField";
import InputErrorMsg from "../../Components/GlobalComponents/InputError";
import SubmitBtn from "../../Components/GlobalComponents/SubmitBtn";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../Utils/handleAxiosError";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAuthRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  async function onSubmit(data: RegisterFormType) {
    try {
      const res = await mutateAsync(data);
      reset();
      navigate("/auth/login");
      toast.success(res.message ?? "Sikeres regisztráció!");
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">Regisztráció</h1>
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
            registerName="email"
            type="email"
            title="Email"
            disabled={isPending}
          />

          <InputErrorMsg errorMsg={errors["email"]?.message} />
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
          Regisztráció
        </SubmitBtn>

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
