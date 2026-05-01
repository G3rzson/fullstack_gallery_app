import jwt, { type JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { AuthTokenPayload, JwtSecrets } from "../types/types";

export function getJwtSecrets(): JwtSecrets | null {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    return null;
  }

  return { accessTokenSecret, refreshTokenSecret };
}

export function generateAccessToken(
  payload: AuthTokenPayload,
  secrets: string,
): string {
  return jwt.sign(payload, secrets, { expiresIn: "2m" });
}

export function generateRefreshToken(
  payload: AuthTokenPayload,
  secrets: string,
): string {
  return jwt.sign(payload, secrets, { expiresIn: "1d" });
}

export function verifyRefreshToken(
  token: string,
  secrets: string,
): AuthTokenPayload {
  try {
    const decoded = jwt.verify(token, secrets) as JwtPayload;

    if (typeof decoded !== "object") {
      throw new UnauthorizedError("Invalid refresh token payload");
    }

    return decoded as AuthTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }
}

export function verifyAccessToken(
  token: string,
  secrets: string,
): AuthTokenPayload {
  try {
    const decoded = jwt.verify(token, secrets) as JwtPayload;
    if (typeof decoded !== "object") {
      throw new UnauthorizedError("Invalid access token payload");
    }

    return decoded as AuthTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired access token");
  }
}
