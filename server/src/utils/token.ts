import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";

export type RefreshTokenPayload = JwtPayload & {
  username: string;
};

export type AccessTokenPayload = JwtPayload & {
  username: string;
};

export function generateAccessToken(username: string): string {
  return jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(username: string): string {
  return jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof decoded !== "object" || !("username" in decoded)) {
      throw new UnauthorizedError("Invalid refresh token payload");
    }

    return decoded as RefreshTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (typeof decoded !== "object" || !("username" in decoded)) {
      throw new UnauthorizedError("Invalid access token payload");
    }

    return decoded as AccessTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired access token");
  }
}
