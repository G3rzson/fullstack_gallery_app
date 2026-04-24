import type { Request, Response } from "express";
import { type RegisterSchemaType } from "../../validation/registerSchema";
import { registerUserService } from "../../services/user/register.services";

export async function registerController(
  req: Request<{}, {}, RegisterSchemaType>,
  res: Response,
) {
  const { username, email, password } = req.body;

  await registerUserService({ username, email, password });

  res.json({
    success: true,
    message: "Sikeres regisztráció!",
  });
}
