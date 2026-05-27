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
        <div data-invalid={fieldState.invalid}>
          <label className="flex items-center gap-2 w-fit cursor-pointer select-none group relative">
            <input
              id={field.name}
              type="checkbox"
              checked={field.value === true}
              onChange={(e) => field.onChange(e.target.checked)}
              aria-invalid={fieldState.invalid}
              className="absolute opacity-0 w-5 h-5 cursor-pointer peer"
              disabled={isSubmitting}
            />
            <span
              className={`w-5 h-5 rounded border-2 border-pink-800 dark:border-pink-200 flex items-center justify-center peer-checked:bg-fuchsia-500 dark:peer-checked:bg-fuchsia-700 peer-checked:border-fuchsia-500 dark:peer-checked:border-fuchsia-700 transition-colors`}
            >
              {field.value && <Check className="text-white w-4 h-4" />}
            </span>
            <span>{label}</span>
          </label>
          {fieldState.invalid && (
            <span className="field-error">{fieldState.error?.message}</span>
          )}
        </div>
      )}
    />
  );
}
