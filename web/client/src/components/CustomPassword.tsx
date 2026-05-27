import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useLocation } from "react-router-dom";
import { createPassword } from "../functions/createPassword";

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
        <div className="field-group" data-invalid={fieldState.invalid}>
          <input
            id={field.name}
            {...field}
            type={showPassword ? "text" : "password"}
            value={field.value ?? ""}
            className="field-input"
            placeholder=" "
            aria-invalid={fieldState.invalid}
            disabled={isSubmitting}
            data-invalid={fieldState.invalid}
          />
          <label htmlFor={field.name} className="field-label">
            {label}
          </label>

          {fieldState.invalid && (
            <span className="field-error">{fieldState.error?.message}</span>
          )}

          <button
            type="button"
            className="absolute right-2 top-8 -translate-y-1/2 text-zinc-500 hover:text-pink-800 dark:hover:text-pink-200 transition-colors duration-300 cursor-pointer"
            disabled={isSubmitting}
            title={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeClosed /> : <EyeIcon />}
          </button>

          {pathname === "/user/register" && (
            <button
              type="button"
              disabled={isSubmitting}
              className="absolute right-2 top-13 -translate-y-1/2 text-sm text-zinc-500 hover:text-pink-800 dark:hover:text-pink-200 transition-colors duration-300 cursor-pointer"
              onClick={() => field.onChange(createPassword())}
            >
              Jelszó ajánlása
            </button>
          )}
        </div>
      )}
    />
  );
}
