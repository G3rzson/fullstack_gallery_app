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

export default function CustomEmail<T extends FieldValues>({
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
        <div data-invalid={fieldState.invalid} className="field-group">
          <input
            id={field.name}
            {...field}
            type="text"
            className="field-input"
            value={field.value ?? ""}
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
        </div>
      )}
    />
  );
}
