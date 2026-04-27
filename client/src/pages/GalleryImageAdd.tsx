import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  imageUploadSchema,
  type ImageUploadSchemaType,
} from "../validation/imageUploadSchema";
import ImageUploadDropzone from "../components/ImageUploadDropzone";
import toast from "react-hot-toast";
import { useState } from "react";
import useMyGalleryImageUpload from "../hooks/useMyGalleryImageUpload";
import { useModalContext } from "../hooks/useModalContext";
import { useModalClose } from "../hooks/useModalClose";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";

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
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();
  const { mutateAsync, isPending } = useMyGalleryImageUpload(id);

  const isLoading = isSubmitting || isPending;

  async function onSubmit(data: ImageUploadSchemaType) {
    try {
      setIsModalOpen(true);
      setMode("loader");
      const formData = new FormData();
      data.images.forEach((image) => {
        formData.append("images", image);
      });
      const response = await mutateAsync(formData);
      toast.success(response.message || "Képek feltöltve");
      navigate(`/my-gallery-titles/${id}`);
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      handleModalClose();
    }
  }

  return (
    <div className="centered-container gap-4">
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

        <div className="flex items-center justify-between">
          <Link
            to={`/my-gallery-titles/${id}`}
            className="bg-red-200 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800 border-2 border-pink-800 dark:border-pink-200 cursor-pointer font-semibold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mégsem
          </Link>
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
