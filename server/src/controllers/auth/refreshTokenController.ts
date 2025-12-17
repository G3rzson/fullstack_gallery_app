import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { generateAccessToken, verifyRefreshToken } from "../../utils/token";

export async function refreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedError("Refresh token not found");

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err: any) {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const newAccessToken = generateAccessToken(decoded.user);

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
      user: decoded.user,
    });
  } catch (error) {
    next(error);
  }
}
