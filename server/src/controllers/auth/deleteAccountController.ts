import { NextFunction, Request, Response } from "express";
import { deleteAccountService } from "../../services/auth/deleteAccountService";
import { BadRequestError } from "../../errors/BadRequestError";

export async function deleteAccountController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.username;

  if (!username) {
    throw new BadRequestError("Felhasználónév hiányzik a kérésből.");
  }

  try {
    await deleteAccountService(username);

    res
      .cookie("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      })
      .json({
        success: true,
        message: "A fiók sikeresen törölve.",
      });
  } catch (error) {
    next(error);
  }
}
