import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, "Minimum 2 karakter!")
    .max(25, "Maximum 25 karakter!"),
  password: z
    .string()
    .min(6, "Minimum 6 karakter!")
    .max(25, "Maximum 25 karakter!"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
