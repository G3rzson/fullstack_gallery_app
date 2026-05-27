import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useModalContext } from "../hooks/useModalContext";
import { useModalClose } from "../hooks/useModalClose";
import { Controller, useForm } from "react-hook-form";
import {
  imageUploadSchema,
  type ImageUploadSchemaType,
} from "../validation/imageUploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useMyGalleryImageUpload from "../hooks/useMyGalleryImageUpload";
import PageLoader from "./PageLoader";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import ImageUploadDropzone from "./ImageUploadDropzone";

export default function GalleryImageForm() {
  const { galleryTitleId } = useParams<{ galleryTitleId: string }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const { userObj, isAuthLoading } = useUserContext();
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();
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

  const { mutateAsync, isPending } = useMyGalleryImageUpload();

  const isLoading = isSubmitting || isPending;

  if (isAuthLoading || !userObj) {
    return <PageLoader />;
  }

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
      navigate(`/my-gallery-titles/${galleryTitleId}`);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error);
      if (message === "Max 6 kép engedélyezett!") {
        navigate(`/my-gallery-titles/${galleryTitleId}`);
      }
      toast.error(message);
    } finally {
      handleModalClose();
    }
  }

  return (
    <div className="centered-container">
      {" "}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <p>Képek feltöltése</p>
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
            to={`/my-gallery-titles/${galleryTitleId}`}
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
