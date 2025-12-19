import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import {
  generateAccessToken,
  RefreshTokenPayload,
  verifyRefreshToken,
} from "../../utils/token";

export async function refreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedError("Refresh token not found");

    const decoded = verifyRefreshToken(refreshToken) as RefreshTokenPayload;

    const newAccessToken = generateAccessToken(decoded.username);

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        username: decoded.username,
      },
    });
  } catch (error) {
    next(error);
  }
}
