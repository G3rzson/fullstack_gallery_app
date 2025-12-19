import { loginUserService } from "../../services/auth/loginUserServices";
import { LoginFormType } from "../../zodSchemas/loginFormSchema";
import { Request, Response } from "express";

export async function loginUserController(
  req: Request<{}, {}, LoginFormType>,
  res: Response
) {
  const { username, password } = req.body;

  const { accessToken, userObj, refreshToken } = await loginUserService({
    username,
    password,
  });

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Sikeres bejelentkezés!",
      data: { accessToken, username: userObj.username },
    });
}
