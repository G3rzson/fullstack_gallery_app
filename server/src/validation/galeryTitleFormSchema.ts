import { z } from "zod";

export const galeryTitleFormSchema = z.object({
  galeryTitle: z
    .string()
    .min(2, "Minimum 2 karakter!")
    .max(50, "Maximum 50 karakter!"),
});

export type GaleryTitleFormType = z.infer<typeof galeryTitleFormSchema>;
