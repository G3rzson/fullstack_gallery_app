import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";

export type AuthTokenPayload = JwtPayload & {
  username: string;
  role: "admin" | "user";
};

export function generateAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

export function verifyRefreshToken(token: string): AuthTokenPayload {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof decoded !== "object" || !("username" in decoded)) {
      throw new UnauthorizedError("Invalid refresh token payload");
    }

    return decoded as AuthTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }
}

export function verifyAccessToken(token: string): AuthTokenPayload {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (typeof decoded !== "object" || !("username" in decoded)) {
      throw new UnauthorizedError("Invalid access token payload");
    }

    return decoded as AuthTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired access token");
  }
}
