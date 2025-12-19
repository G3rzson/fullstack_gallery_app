import type { Request, Response } from "express";
import { registerUserService } from "../../services/auth/registerUserServices";
import { RegisterFormType } from "../../zodSchemas/registerFormSchema";

export async function registerUserController(
  req: Request<{}, {}, RegisterFormType>,
  res: Response
) {
  const { username, email, password } = req.body;

  await registerUserService({ username, email, password });

  res.json({
    success: true,
    message: "Sikeres regisztráció!",
  });
}
