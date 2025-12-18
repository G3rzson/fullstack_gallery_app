import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = {
  register: UseFormRegister<T>;
  registerName: Path<T>;
  type: React.HTMLInputTypeAttribute;
  title: string;
  disabled: boolean;
};

export default function InputField<T extends FieldValues = FieldValues>({
  register,
  registerName,
  type,
  title,
  disabled,
}: Props<T>) {
  return (
    <input
      {...register(registerName)}
      className="bg-white text-black border-none outline-0 p-2 rounded w-full"
      type={type}
      disabled={disabled}
      placeholder={title}
      aria-label={title}
    />
  );
}
