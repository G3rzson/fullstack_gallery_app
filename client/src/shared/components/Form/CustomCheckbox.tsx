import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Check } from "lucide-react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isSubmitting: boolean;
};

export default function CustomCheckbox<T extends FieldValues>({
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
          <label className="checkbox-wrapper">
            <input
              id={field.name}
              type="checkbox"
              checked={field.value === true}
              onChange={(e) => field.onChange(e.target.checked)}
              aria-invalid={fieldState.invalid}
              className="checkbox"
              disabled={isSubmitting}
            />
            <span className="checkmark">
              <Check />
            </span>
            <span className="label-title">{label}</span>
          </label>
          {fieldState.invalid && (
            <span className="field-error">{fieldState.error?.message}</span>
          )}
        </div>
      )}
    />
  );
}
