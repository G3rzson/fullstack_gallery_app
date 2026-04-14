import { Link, useNavigate } from "react-router-dom";
import CustomText from "../../../components/Form/CustomText";
import PageTitle from "../../../components/PageTitle/PageTitle";
import {
  registerSchema,
  type RegisterSchemaType,
} from "./Validation/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomEmail from "../../../components/Form/CustomEmail";
import CustomPassword from "../../../components/Form/CustomPassword";
import useRegister from "./hooks/useRegister";

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

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: RegisterSchemaType) {
    console.log(data);
    try {
      const response = await mutateAsync(data);
      navigate("/auth/login");
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  return (
    <div className="centered-container">
      <PageTitle>Regisztráció</PageTitle>

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

        <div className="link-container">
          <p>Van már fiókod? </p>
          <Link to="/auth/login" className="link">
            Jelentkezz be!
          </Link>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          Regisztráció
        </button>
      </form>
    </div>
  );
}
