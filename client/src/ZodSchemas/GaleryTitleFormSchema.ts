import { z } from "zod";

export const galeryTitleFormSchema = z.object({
  galeryTitle: z
    .string()
    .min(2, "Minimum 2 karakter!")
    .max(15, "Maximum 15 karakter!"),
  isPrivate: z.boolean(),
});

export type GaleryTitleFormType = z.infer<typeof galeryTitleFormSchema>;
