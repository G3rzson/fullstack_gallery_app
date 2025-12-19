import { NextFunction, Request, Response } from "express";

export function logoutUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    res.json({
      success: true,
      message: "Kijelentkezés sikeres.",
    });
  } catch (err) {
    next(err);
  }
}
