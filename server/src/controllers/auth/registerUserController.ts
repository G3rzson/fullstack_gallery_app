import type { Request, Response } from "express";
import { registerFormSchema } from "../../zodSchemas/registerFormSchema";
import { registerUserService } from "../../services/auth/registerUserServices";

export async function registerUserController(req: Request, res: Response) {
  const { username, email, password } = registerFormSchema.parse(req.body);

  await registerUserService({ username, email, password });

  res.json({
    success: true,
    message: "User registered successfully!",
  });
}
