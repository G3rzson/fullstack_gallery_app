import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../functions/errorHandler";
import { AppError } from "../errors/AppError";
import { findUserById } from "../db/dal/user.repository";
import { NotFoundError } from "../errors/NotFoundError";
import { getGalleryTitleById } from "../db/dal/gallery.repository";

// megírni mert nem jó !!!
export async function hasPermissionMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req._id as string;

    const userObj = await findUserById(userId);
    if (!userObj) {
      throw new NotFoundError("Felhasználó nem található");
    }

    const galleryTitles = await getGalleryTitleById(userId);

    if (userId !== userObj._id.toString()) {
      throw new AppError("Nincs jogosultságod ehhez a művelethez", 403);
    }

    next();
  } catch (error) {
    errorHandler(error);
  }
}
