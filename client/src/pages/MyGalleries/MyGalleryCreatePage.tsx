import { useForm } from "react-hook-form";
import PageTitle from "../../shared/components/PageTitle/PageTitle";
import {
  gallerySchema,
  type GallerySchemaType,
} from "./validation/gallerySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomText from "../../shared/components/Form/CustomText";
import CustomCheckbox from "../../shared/components/Form/CustomCheckbox";
import useGaleryTitleCreate from "./hooks/useGaleryTitleCreate";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function MyGalleryCreatePage() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<GallerySchemaType>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      gallery: "",
      isPublic: false,
    },
  });
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useGaleryTitleCreate();

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: GallerySchemaType) {
    try {
      const response = await mutateAsync(data);
      navigate("/my-galleries");
      toast.success(response.message);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;
      toast.error(errorMessage);
    }
  }

  return (
    <div className="centered-container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <p>Galéria létrehozása</p>
        <CustomText
          control={control}
          name="gallery"
          label="Galéria neve"
          isSubmitting={isLoading}
        />
        <CustomCheckbox
          control={control}
          name="isPublic"
          label="Nyilvános galéria"
          isSubmitting={isLoading}
        />
        <button type="submit" disabled={isLoading} className="submit-btn">
          Létrehozás
        </button>
      </form>
    </div>
  );
}
