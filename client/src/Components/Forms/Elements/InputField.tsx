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

export default function InputField<T extends FieldValues>({
  register,
  errors,
  placeholder,
  type,
  registerName,
  multiple = false,
}: Props<T>) {
  return (
    <div className="relative">
      <input
        {...register(registerName)}
        className="bg-white text-black border-none outline-0 p-2 rounded w-full"
        type={type}
        placeholder={placeholder}
        multiple={!!multiple}
      />
      {errors[registerName] && (
        <p className="dark:text-red-400 text-red-500 text-sm absolute -bottom-5 left-0">
          {String(errors[registerName]?.message)}
        </p>
      )}
    </div>
  );
}
