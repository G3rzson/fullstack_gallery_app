import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { errorHandler } from "../functions/errorHandler";
import { findUserByUsername } from "../db/dal/user.repository";

export async function isAdminMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const username = req.username;
    if (!username) {
      throw new UnauthorizedError("Unauthorized");
    }

    const userObj = await findUserByUsername(username);
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
