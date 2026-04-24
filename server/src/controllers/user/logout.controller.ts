import { NextFunction, Request, Response } from "express";

export function logoutController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
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
      message: "Kijelentkezés sikeres.",
    });
  } catch (err) {
    next(err);
  }
}
