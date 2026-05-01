import { NextFunction, Request, Response } from "express";
import { deleteAccountService } from "../../services/user/deleteAccount.services";

export async function deleteAccountController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId as string;

    await deleteAccountService(userId);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(0),
      path: "/",
    });

    res.json({
      success: true,
      message: "Fiók sikeresen törölve!",
    });
  } catch (err) {
    next(err);
  }
}
