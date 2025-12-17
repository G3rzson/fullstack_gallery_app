import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export function logoutUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.json({
        success: true,
        message: "User logged out successfully!",
        data: { user: null, accessToken: null },
      });
    }

    return res
      .cookie("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "User logged out successfully!",
        data: { user: null, accessToken: null },
      });
  } catch (err) {
    next(err);
  }
}
