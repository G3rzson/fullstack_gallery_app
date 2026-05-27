import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { errorHandler } from "../functions/errorHandler";
import { findUserById } from "../db/dal/user.repository";

export async function isAdminMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req._id as string;
    const userObj = await findUserById(userId);
    if (!userObj) {
      // A JWT valid volt, de a user már nem létezik (pl. törölve lett)
      // 401-et adunk vissza, hogy a kliens kijelentkeztesse magát
      throw new UnauthorizedError("Hitelesítés szükséges.");
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
