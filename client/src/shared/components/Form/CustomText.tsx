import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isSubmitting: boolean;
};

export default function CustomText<T extends FieldValues>({
  control,
  name,
  label,
  isSubmitting,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div data-invalid={fieldState.invalid} className="field-container">
          <input
            id={field.name}
            {...field}
            className="input"
            type="text"
            value={field.value ?? ""}
            placeholder=" "
            aria-invalid={fieldState.invalid}
            disabled={isSubmitting}
          />
          <label htmlFor={field.name} className="field-label">
            {label}
          </label>
          {fieldState.invalid && (
            <span className="field-error">{fieldState.error?.message}</span>
          )}
        </div>
      )}
    />
  );
}
