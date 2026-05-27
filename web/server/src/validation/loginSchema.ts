import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string("A mező kötelező!")
    .trim()
    .transform((str) => str.replace(/\s+/g, " "))
    .pipe(
      z.string().min(1, "A név kötelező!").max(30, "Max hossz 30 karakter!"),
    ),
  password: z
    .string("A mező kötelező!")
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
    })
    .refine((val) => !/\s/.test(val), {
      message: "A jelszó nem tartalmazhat szóközt",
    }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
