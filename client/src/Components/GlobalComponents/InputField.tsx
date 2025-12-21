import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = {
  register: UseFormRegister<T>;
  registerName: Path<T>;
  type: React.HTMLInputTypeAttribute;
  title: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

export default function InputField<T extends FieldValues = FieldValues>({
  register,
  registerName,
  type,
  title,
  disabled = false,
  inputRef,
}: Props<T>) {
  const { ref, ...rest } = register(registerName);

  return (
    <input
      {...rest}
      ref={(e) => {
        ref(e);
        if (inputRef) {
          inputRef.current = e;
        }
      }}
      type={type}
      disabled={disabled}
      placeholder={title}
      aria-label={title}
      className="bg-white text-black border-none outline-0 p-2 rounded w-full"
      multiple={type === "file" ? true : undefined}
      accept={type === "file" ? "image/*" : undefined}
    />
  );
}
