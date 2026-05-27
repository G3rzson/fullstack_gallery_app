import type { Request, Response, NextFunction } from "express";
import { type RegisterSchemaType } from "../../validation/registerSchema";
import { registerUserService } from "../../services/user/register.services";

export async function registerController(
  req: Request<{}, {}, RegisterSchemaType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, email, password } = req.body;

    await registerUserService({ username, email, password });

    res.json({
      success: true,
      message: "Sikeres regisztráció!",
    });
  } catch (error) {
    next(error);
  }
}
