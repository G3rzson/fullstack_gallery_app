import { Link, useNavigate } from "react-router-dom";
import CustomText from "../components/CustomText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema, type LoginSchemaType } from "../validation/loginSchema";
import useLogin from "../hooks/useLogin";
import { useUserContext } from "../hooks/useUserContext";
import CustomPassword from "../components/CustomPassword";
import { useModalContext } from "../hooks/useModalContext";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import { useModalClose } from "../hooks/useModalClose";

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
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: LoginSchemaType) {
    try {
      setIsModalOpen(true);
      setMode("loader");
      const response = await mutateAsync(data);
      toast.success(response.message);
      setAccessToken(response.data.accessToken);
      setUserObj(response.data.userObj);
      navigate("/my-gallery-titles"); // my-gallery-titles
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      handleModalClose();
    }
  }
  return (
    <div className="centered-container gap-4">
      <h1 className="page-title">Bejelentkezés</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="form-container"
      >
        <p className="text-sm">A *-al jelölt mezők kitöltése kötelező.</p>

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

        <div className="form-info-field">
          <p>Még nincs fiókod? </p>
          <Link to="/user/register" className="form-link">
            Regisztrálj!
            <span className="under-line"></span>
          </Link>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          Bejelentkezés
        </button>
      </form>
    </div>
  );
}
