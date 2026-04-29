import { Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";

// Middleware to handle invalid URLs (404 Not Found)
export function invalidUrlMW(req: Request, res: Response) {
  throw new NotFoundError("API végpont nem található");
}
