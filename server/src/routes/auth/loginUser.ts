import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import RegisterUserModel from "../../db/registerUserSchema";
import { generateAccessToken } from "../../functions/generateAccessToken";
import { generateRefreshToken } from "../../functions/generateRefreshToken";
import { loginFormSchema } from "../../validation/loginFormSchema";

export async function loginUser(req: Request, res: Response) {
  try {
    const validatedData = loginFormSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error!",
      });
    }

    const existingUser = await RegisterUserModel.findOne({
      username: validatedData.data.username,
    });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.data.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password!" });
    }

    const accessToken = generateAccessToken(existingUser.username);

    const refreshToken = generateRefreshToken(existingUser.username);

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 nap
      })
      .json({
        success: true,
        message: "User logged in successfully!",
        data: { accessToken, user: existingUser.username },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
