import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export function generateAccessToken(user: string): string {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    throw new Error("Hiányzó ACCESS_TOKEN környezeti változó");
  }

  return jwt.sign({ user }, ACCESS_TOKEN, { expiresIn: "5m" });
}
