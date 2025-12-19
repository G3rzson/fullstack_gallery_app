import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";

export function getUserFromTokenMW() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) return next();

    try {
      const decoded = verifyAccessToken(token);
      req.username = decoded.username;
    } catch {
      // hibás token → úgy kezeljük, mintha nem lenne bejelentkezve
    }

    next();
  };
}
