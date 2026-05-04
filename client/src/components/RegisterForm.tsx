import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { useModalContext } from "../hooks/useModalContext";
import { useModalClose } from "../hooks/useModalClose";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import CustomText from "./CustomText";
import CustomEmail from "./CustomEmail";
import CustomPassword from "./CustomPassword";

export default function RegisterForm() {
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
  const handleModalClose = useModalClose();

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
      handleModalClose();
    }
  }
  return (
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
  );
}
