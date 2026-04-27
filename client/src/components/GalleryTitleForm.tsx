import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { GalleryTitleType } from "../types/types";
import {
  gallerySchema,
  type GallerySchemaType,
} from "../validation/gallerySchema";
import useMyGaleryTitleCreate from "../hooks/useMyGaleryTitleCreate";
import useMyGaleryTitleUpdate from "../hooks/useMyGaleryTitleUpdate";
import CustomText from "./CustomText";
import CustomCheckbox from "./CustomCheckbox";

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

  const createMutation = useMyGaleryTitleCreate();
  const updateMutation = useMyGaleryTitleUpdate(gallery?._id || "");

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
      navigate("/my-gallery-titles");
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
