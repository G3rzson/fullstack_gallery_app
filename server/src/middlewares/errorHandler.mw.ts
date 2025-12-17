import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

// Global error handling middleware
export function errorHandlerMW(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  /*---------------------------------------------------------------
    | külső hiba loggoló szolgáltatások integrációja ide kerülhet |
    ---------------------------------------------------------------*/

  // handle custom AppErrors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  //  handle other unexpected errors
  return res.status(500).json({
    success: false,
    message: "Szerver hiba!",
  });
}
