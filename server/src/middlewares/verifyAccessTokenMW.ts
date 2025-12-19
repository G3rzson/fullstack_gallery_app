import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export function verifyAccessTokenMW() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new UnauthorizedError("No token provided"));
    }
    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      return next(new UnauthorizedError("No token provided"));
    }
    try {
      const decoded = verifyAccessToken(token);
      req.username = decoded.username;
      next();
    } catch (err) {
      return next(new UnauthorizedError("Invalid token"));
    }
  };
}
