import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { RefreshTokenPayload } from "../types/types";

// Access token
export function generateAccessToken(user: string): string {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Hiányzó ACCESS_TOKEN környezeti változó");
  }

  return jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

// Refresh token
export function generateRefreshToken(user: string): string {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Hiányzó REFRESH_TOKEN környezeti változó");
  }

  return jwt.sign({ user }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

// Verify refresh token
export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Hiányzó REFRESH_TOKEN környezeti változó");
  }

  return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
}
