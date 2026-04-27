import { NextFunction, Request, Response } from "express";
import { LoginSchemaType } from "../../validation/loginSchema";
import { loginUserService } from "../../services/user/login.services";

export async function loginController(
  req: Request<{}, {}, LoginSchemaType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, password } = req.body;
    const isProduction = process.env.NODE_ENV === "production";

    const { accessToken, userObj, refreshToken } = await loginUserService({
      username,
      password,
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: "Sikeres bejelentkezés!",
        data: { accessToken, userObj },
      });
  } catch (error) {
    next(error);
  }
}
