import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import {
  generateAccessToken,
  getJwtSecrets,
  verifyRefreshToken,
} from "../../functions/jwt";

export async function refreshController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    console.log("Refresh token cookie:", refreshToken ? "EXISTS" : "MISSING");

    if (!refreshToken) {
      return next(new UnauthorizedError("No refresh token provided"));
    }

    const secrets = getJwtSecrets();
    if (!secrets) {
      return next(new UnauthorizedError("JWT secrets not configured"));
    }

    const decoded = verifyRefreshToken(
      refreshToken,
      secrets.refreshTokenSecret,
    );

    const userObj = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(
      userObj,
      secrets.accessTokenSecret,
    );

    res.json({
      success: true,
      message: "Token frissítve",
      data: {
        accessToken: newAccessToken,
        userObj,
      },
    });
  } catch (error) {
    next(error);
  }
}
