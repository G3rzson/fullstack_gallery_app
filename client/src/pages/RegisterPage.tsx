import { Link, useNavigate } from "react-router-dom";
import CustomText from "../components/CustomText";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../validation/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomEmail from "../components/CustomEmail";
import toast from "react-hot-toast";
import useRegister from "../hooks/useRegister";
import CustomPassword from "../components/CustomPassword";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import { useModalContext } from "../hooks/useModalContext";

export default function RegisterPage() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
  const { setIsModalOpen, setMode } = useModalContext();

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: RegisterSchemaType) {
    try {
      setIsModalOpen(true);
      setMode("loader");
      const response = await mutateAsync(data);
      toast.success(response.message || "Sikeres regisztráció!");
      navigate("/user/login");
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsModalOpen(false);
    }
  }

  return (
    <div className="centered-container gap-4">
      <h1 className="page-title">Regisztráció</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate={true}
        className="form-container"
      >
        <p className="text-sm">A *-al jelölt mezők kitöltése kötelező.</p>

        <CustomText
          label="Felhasználónév *"
          name="username"
          control={control}
          isSubmitting={isLoading}
        />

        <CustomEmail
          label="Email *"
          name="email"
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
          <p>Van már fiókod? </p>
          <Link to="/user/login" className="form-link">
            Jelentkezz be!
            <span className="under-line"></span>
          </Link>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          Regisztráció
        </button>
      </form>
    </div>
  );
}
