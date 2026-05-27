import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface ImageUploadDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  error?: any;
  isSubmitting: boolean;
}

export default function ImageUploadDropzone({
  files,
  onFilesChange,
  error,
  isSubmitting,
}: ImageUploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, 5);
      onFilesChange(newFiles);
    },
    [files, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    disabled: isSubmitting || files.length >= 5,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div
        {...getRootProps()}
        className={[
          "flex flex-col items-center justify-center border-2 border-dashed border-pink-800 dark:border-pink-200 bg-fuchsia-100 dark:bg-fuchsia-900 rounded-md p-6 cursor-pointer transition-colors duration-300 w-full min-h-[160px] text-center",
          isDragActive
            ? "bg-fuchsia-200 dark:bg-fuchsia-800 border-fuchsia-500 dark:border-fuchsia-400"
            : "",
          error
            ? "border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-400"
            : "",
          files.length >= 5 ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        <Upload size={48} />
        {isDragActive ? (
          <p>Húzd ide a képeket...</p>
        ) : (
          <div className="flex flex-col gap-1 items-center">
            <p>Kattints vagy húzd ide a képeket</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Maximum 5 kép, egyenként max 5MB (JPG, PNG, WEBP)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message || error.root?.message}
        </p>
      )}

      {files.length > 0 && (
        <div className="w-full mt-4">
          <p className="font-semibold mb-2 text-pink-800 dark:text-pink-200">
            Kiválasztott képek ({files.length}/5)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col h-25 items-center rounded-lg relative"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-contain rounded mb-1"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 text-pink-950 dark:text-pink-200 rounded-full p-1 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
