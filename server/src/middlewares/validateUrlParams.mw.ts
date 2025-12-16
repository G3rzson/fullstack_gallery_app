import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/BadRequestError";

export function validateUrlParam(urlParams: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[urlParams];

    if (!value || typeof value !== "string" || value.trim() === "") {
      throw new BadRequestError("Érvénytelen URL paraméter");
    }

    next();
  };
}
