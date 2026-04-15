import { Request, Response } from "express";

// Middleware to handle invalid URLs (404 Not Found)
export function invalidUrlMW(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: "API végpont nem található",
  });
}
