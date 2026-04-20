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
    <div className="dropzone-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "dropzone-active" : ""} ${
          error ? "dropzone-error" : ""
        } ${files.length >= 5 ? "dropzone-disabled" : ""}`}
      >
        <input {...getInputProps()} />
        <Upload size={48} />
        {isDragActive ? (
          <p>Húzd ide a képeket...</p>
        ) : (
          <div className="dropzone-text">
            <p>Kattints vagy húzd ide a képeket</p>
            <p className="dropzone-hint">
              Maximum 5 kép, egyenként max 5MB (JPG, PNG, WEBP)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="error-message">{error.message || error.root?.message}</p>
      )}

      {files.length > 0 && (
        <div className="preview-container">
          <p className="preview-title">Kiválasztott képek ({files.length}/5)</p>
          <div className="preview-grid">
            {files.map((file, index) => (
              <div key={index} className="preview-item">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="preview-remove"
                  disabled={isSubmitting}
                >
                  <X size={16} />
                </button>
                <p className="preview-name">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
