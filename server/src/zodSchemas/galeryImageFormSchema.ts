import { z } from "zod";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const galeryImagesFormSchema = z.object({
  galeryImages: z
    .custom<FileList>()
    .refine(
      (files) => !!files && files.length > 0,
      "Válassz legalább egy képet!"
    )
    .refine(
      (files) =>
        !!files && Array.from(files).every((f) => f.size <= MAX_FILE_SIZE),
      "Egy fájl max 10 MB lehet!"
    )
    .refine(
      (files) =>
        !!files &&
        Array.from(files).every((f) => ACCEPTED_IMAGE_TYPES.includes(f.type)),
      "Csak JPG, PNG vagy WEBP képek engedélyezettek!"
    ),
});

export type GaleryImagesFormType = z.infer<typeof galeryImagesFormSchema>;
