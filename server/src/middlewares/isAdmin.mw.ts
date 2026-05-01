import type { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { errorHandler } from "../functions/errorHandler";
import { findUserById } from "../db/dal/user.repository";

export async function isAdminMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId as string;
    const userObj = await findUserById(userId);
    if (!userObj) {
      throw new NotFoundError("User not found");
    }

    if (userObj.role !== "ADMIN") {
      throw new BadRequestError(
        "Nincs jogosultságod a művelet végrehajtásához",
      );
    }

    next();
  } catch (error) {
    errorHandler(error);
  }
}
