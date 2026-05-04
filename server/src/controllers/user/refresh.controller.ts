import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import {
  generateAccessToken,
  getJwtSecrets,
  verifyRefreshToken,
} from "../../functions/jwt";
import { findUserById } from "../../db/dal/user.repository";

export async function refreshController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies?.refreshToken;

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

    // Ellenőrizzük, hogy a user még létezik-e az adatbázisban
    const userExists = await findUserById(decoded._id);
    if (!userExists) {
      throw new UnauthorizedError("Hitelesítés szükséges.");
    }

    const tokenPayload = {
      _id: decoded._id,
      username: decoded.username,
      role: decoded.role,
    };

    const userObj = {
      _id: decoded._id,
      username: decoded.username,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(
      tokenPayload,
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
