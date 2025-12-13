import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export function generateRefreshToken(user: string): string {
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  if (!REFRESH_TOKEN) {
    throw new Error("Hiányzó REFRESH_TOKEN környezeti változó");
  }

  return jwt.sign({ user }, REFRESH_TOKEN, { expiresIn: "1d" });
}
