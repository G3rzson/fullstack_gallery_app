import { z } from "zod";

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(2, "Minimum 2 karakter!")
    .max(25, "Maximum 25 karakter!"),
  email: z.string().email("Érvényes email cím szükséges!"),
  password: z
    .string()
    .min(6, "Minimum 6 karakter!")
    .max(25, "Maximum 25 karakter!"),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
