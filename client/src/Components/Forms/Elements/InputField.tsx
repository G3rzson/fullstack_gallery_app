import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { GaleryTitleFormType } from "../../../Validation/GaleryTitleFormSchema";

type Props = {
  register: UseFormRegister<GaleryTitleFormType>;
  errors: FieldErrors<GaleryTitleFormType>;
  placeholder: string;
};

export default function InputField({ register, errors, placeholder }: Props) {
  return (
    <div className="relative">
      <input
        {...register("galeryTitle")}
        className="bg-white text-black border-none outline-0 p-2 rounded w-full"
        type="text"
        placeholder={placeholder}
      />
      {errors.galeryTitle && (
        <p className="dark:text-red-400 text-red-500 text-sm absolute -bottom-5 left-0">
          {errors.galeryTitle.message}
        </p>
      )}
    </div>
  );
}
