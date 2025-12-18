import type { FieldErrors, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = {
  errors: FieldErrors<T>;
  inputKey: Path<T>;
};

export default function InputError<T extends FieldValues = FieldValues>({
  errors,
  inputKey,
}: Props<T>) {
  const error = errors[inputKey];

  if (!error?.message) return null;

  return (
    <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
      {String(error.message)}
    </p>
  );
}
