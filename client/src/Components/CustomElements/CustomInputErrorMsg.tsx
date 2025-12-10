import type { FieldErrors, Path, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  registerName: Path<T>;
};

export default function CustomInputErrorMsg<T extends FieldValues>({
  errors,
  registerName,
}: Props<T>) {
  return (
    <>
      {errors[registerName] && (
        <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
          {String(errors[registerName]?.message)}
        </p>
      )}
    </>
  );
}
