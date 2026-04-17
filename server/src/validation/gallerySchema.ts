import { z } from "zod";

export const gallerySchema = z.object({
  gallery: z
    .string()
    .trim()
    .transform((str) => str.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(1, "A galéria neve kötelező!")
        .max(30, "Max hossz 30 karakter!"),
    ),

  isPublic: z.boolean(),
});

export type GallerySchemaType = z.infer<typeof gallerySchema>;
