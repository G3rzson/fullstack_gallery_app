import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { getJwtSecrets, verifyAccessToken } from "../functions/jwt";

export function verifyAccessTokenMW() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("No token provided"));
      }
      const token = authHeader.slice("Bearer ".length).trim();
      if (!token) {
        return next(new UnauthorizedError("No token provided"));
      }
      const secrets = getJwtSecrets();
      if (!secrets) {
        return next(new UnauthorizedError("JWT secrets not configured"));
      }

      const decoded = verifyAccessToken(token, secrets.accessTokenSecret);

      req.username = decoded.username;
      next();
    } catch (err) {
      return next(new UnauthorizedError("Invalid token"));
    }
  };
}
