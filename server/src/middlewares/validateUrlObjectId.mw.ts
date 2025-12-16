import mongoose from "mongoose";
import { BadRequestError } from "../errors/BadRequestError";
import { NextFunction, Request, Response } from "express";

export function validateObjectIdMW(objectId: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[objectId];

    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestError("Érvénytelen URL paraméter");
    }

    next();
  };
}
