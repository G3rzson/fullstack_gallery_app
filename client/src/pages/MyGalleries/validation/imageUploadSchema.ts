import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageUploadSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "A fájl mérete maximum 5MB lehet",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Csak JPG, PNG és WEBP fájlok engedélyezettek",
        }),
    )
    .min(1, "Legalább egy képet fel kell tölteni")
    .max(5, "Maximum 5 képet lehet feltölteni egyszerre"),
});

export type ImageUploadSchemaType = z.infer<typeof imageUploadSchema>;
