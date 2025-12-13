import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../functions/generateAccessToken";
import dotenv from "dotenv";
dotenv.config();

export async function refreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found!",
      });
    }

    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN;
    if (!REFRESH_TOKEN_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error!",
      });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token!",
        });
      }

      const newAccessToken = generateAccessToken(decoded.user);

      return res.json({
        success: true,
        message: "Access token refreshed successfully!",
        accessToken: newAccessToken,
        user: decoded.user,
      });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
