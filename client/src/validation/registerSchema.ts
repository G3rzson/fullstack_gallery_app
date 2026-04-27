import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string("A mező kötelező!")
    .trim()
    .transform((str) => str.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(3, "Minimum 3 karakter!")
        .max(30, "Max hossz 30 karakter!"),
    ),
  email: z
    .string("A mező kötelező!")
    .toLowerCase()
    .trim()
    .email("Érvénytelen email cím!"),
  password: z
    .string("A mező kötelező!")
    .trim()
    .min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie!")
    .max(20, "A jelszó nem lehet hosszabb 20 karakternél!")
    .refine((val) => /[a-z]/.test(val), {
      message: "A jelszónak tartalmaznia kell kisbetűt",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "A jelszónak tartalmaznia kell nagybetűt",
    })
    .refine((val) => /\d/.test(val), {
      message: "A jelszónak tartalmaznia kell számot",
    })
    .refine((val) => /^[A-Za-z\d]+$/.test(val), {
      message: "A jelszó nem tartalmazhat speciális karaktert",
    }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
