import type {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  type: string;
  registerName: Path<T>;
  multiple?: boolean;
};

export default function CustomInputField<T extends FieldValues>({
  register,
  placeholder,
  type,
  registerName,
  multiple = false,
}: Props<T>) {
  return (
    <input
      {...register(registerName)}
      className="bg-white text-black border-none outline-0 p-2 rounded w-full"
      type={type}
      placeholder={placeholder}
      multiple={!!multiple}
    />
  );
}
