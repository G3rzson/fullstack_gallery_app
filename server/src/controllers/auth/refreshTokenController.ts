import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import {
  generateAccessToken,
  verifyRefreshToken,
  AuthTokenPayload,
} from "../../utils/token";

export async function refreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedError("Refresh token not found");

    const decoded = verifyRefreshToken(refreshToken) as AuthTokenPayload;

    const newAccessToken = generateAccessToken({
      username: decoded.username,
      role: decoded.role,
    });

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        userObj: { username: decoded.username, role: decoded.role },
      },
    });
  } catch (error) {
    next(error);
  }
}
