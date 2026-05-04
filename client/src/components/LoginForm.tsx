import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "../validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useUserContext } from "../hooks/useUserContext";
import { useModalContext } from "../hooks/useModalContext";
import { useModalClose } from "../hooks/useModalClose";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import CustomText from "./CustomText";
import CustomPassword from "./CustomPassword";

export default function LoginForm() {
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
  );
}
