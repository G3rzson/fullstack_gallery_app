import { Link, useNavigate } from "react-router-dom";
import CustomText from "../../../shared/components/Form/CustomText";
import PageTitle from "../../../shared/components/PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomPassword from "../../../shared/components/Form/CustomPassword";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { loginSchema, type LoginSchemaType } from "./validation/loginSchema";
import useLogin from "./hooks/useLogin";
import { useUserContext } from "../context/useUserContext";

export default function LoginPage() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();
  const { setAccessToken, setUserObj } = useUserContext();

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: LoginSchemaType) {
    try {
      const response = await mutateAsync(data);
      toast.success(response.message);
      setAccessToken(response.data.accessToken);
      setUserObj(response.data.userObj);
      navigate("/");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;
      toast.error(errorMessage);
    }
  }
  return (
    <div className="centered-container">
      <PageTitle>Bejelentkezés</PageTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="form-container"
      >
        <p className="">A *-al jelölt mezők kitöltése kötelező.</p>

        <CustomText
          label="Felhasználónév *"
          name="username"
          control={control}
          isSubmitting={isLoading}
        />

        <CustomPassword
          label="Jelszó *"
          name="password"
          control={control}
          isSubmitting={isLoading}
        />

        <div className="link-container">
          <p>Még nincs fiókod? </p>
          <Link to="/user/register" className="link">
            Regisztrálj!
          </Link>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          Bejelentkezés
        </button>
      </form>
    </div>
  );
}
