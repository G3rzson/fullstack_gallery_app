import { useForm } from "react-hook-form";
import {
  gallerySchema,
  type GallerySchemaType,
} from "../validation/gallerySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useGaleryTitleCreate from "../hooks/useGaleryTitleCreate";
import useGaleryTitleUpdate from "../hooks/useGaleryTitleUpdate";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import CustomText from "../../../shared/components/Form/CustomText";
import CustomCheckbox from "../../../shared/components/Form/CustomCheckbox";
import type { GalleryTitleType } from "../../../types/types";
import { useEffect } from "react";

export default function GalleryTitleForm({
  gallery,
}: {
  gallery?: GalleryTitleType;
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<GallerySchemaType>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      gallery: "",
      isPublic: false,
    },
  });
  const navigate = useNavigate();

  const createMutation = useGaleryTitleCreate();
  const updateMutation = useGaleryTitleUpdate(gallery?._id || "");

  const mutation = gallery ? updateMutation : createMutation;
  const { mutateAsync, isPending } = mutation;

  const isLoading = isSubmitting || isPending;

  useEffect(() => {
    if (gallery) {
      reset({
        gallery: gallery.gallery,
        isPublic: gallery.isPublic,
      });
    }
  }, [gallery, reset]);

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
        <p>Galéria {gallery ? "frissítése" : "létrehozása"}</p>
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
          {gallery ? "Frissítés" : "Létrehozás"}
        </button>
      </form>
    </div>
  );
}
