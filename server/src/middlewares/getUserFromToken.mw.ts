import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export function getUserFromTokenMW(options?: { strict?: boolean }) {
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
      if (options?.strict) {
        return next(new UnauthorizedError("Invalid token"));
      }
    }

    next();
  };
}
