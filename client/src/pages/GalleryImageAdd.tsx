import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  imageUploadSchema,
  type ImageUploadSchemaType,
} from "../validation/imageUploadSchema";
import ImageUploadDropzone from "../components/ImageUploadDropzone";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import useMyGalleryImageUpload from "../hooks/useMyGalleryImageUpload";

export default function GalleryImageAdd() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);

  if (!id) {
    navigate("/my-gallery-titles");
    return null;
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ImageUploadSchemaType>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      images: [],
    },
  });

  const { mutateAsync, isPending } = useMyGalleryImageUpload(id);

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: ImageUploadSchemaType) {
    try {
      const formData = new FormData();
      data.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await mutateAsync(formData);
      toast.success(response.message || "Képek feltöltve");
      navigate(`/my-galleries/${id}`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;
      toast.error(errorMessage);
    }
  }

  return (
    <div className="centered-container">
      <h1 className="page-title">Képek feltöltése</h1>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUploadDropzone
              files={files}
              onFilesChange={(newFiles) => {
                setFiles(newFiles);
                field.onChange(newFiles);
              }}
              error={errors.images}
              isSubmitting={isLoading}
            />
          )}
        />

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/my-gallery-titles/${id}`)}
            className="cancel-btn"
            disabled={isLoading}
          >
            Mégsem
          </button>
          <button
            type="submit"
            disabled={isLoading || files.length === 0}
            className="submit-btn"
          >
            {isLoading ? "Feltöltés..." : "Feltöltés"}
          </button>
        </div>
      </form>
    </div>
  );
}
