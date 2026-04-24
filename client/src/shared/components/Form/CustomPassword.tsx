import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useLocation } from "react-router-dom";
import { createPassword } from "../../functions/createPassword";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isSubmitting: boolean;
};

export default function CustomPassword<T extends FieldValues>({
  control,
  name,
  label,
  isSubmitting,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const { pathname } = useLocation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="field-container" data-invalid={fieldState.invalid}>
          <div className="password-input-wrapper">
            <input
              id={field.name}
              {...field}
              type={showPassword ? "text" : "password"}
              value={field.value ?? ""}
              className="input"
              placeholder=" "
              aria-invalid={fieldState.invalid}
              disabled={isSubmitting}
            />
            <label htmlFor={field.name} className="field-label">
              {label}
            </label>
            <button
              type="button"
              className="toggle-visibility-btn"
              disabled={isSubmitting}
              title={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeClosed /> : <EyeIcon />}
            </button>
          </div>

          {pathname === "/user/register" && (
            <button
              type="button"
              disabled={isSubmitting}
              className="pwd-suggest-btn"
              onClick={() => field.onChange(createPassword())}
            >
              Jelszó ajánlása
            </button>
          )}

          {fieldState.invalid && (
            <span className="field-error">{fieldState.error?.message}</span>
          )}
        </div>
      )}
    />
  );
}
