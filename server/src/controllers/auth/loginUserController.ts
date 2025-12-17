import { loginUserService } from "../../services/auth/loginUserServices";
import { loginFormSchema } from "../../zodSchemas/loginFormSchema";
import { Request, Response } from "express";

export async function loginUserController(req: Request, res: Response) {
  const { username, password } = loginFormSchema.parse(req.body);

  const { accessToken, user } = await loginUserService(username, password);

  res
    .cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "User logged in successfully!",
      data: { accessToken, user: user.username },
    });
}
