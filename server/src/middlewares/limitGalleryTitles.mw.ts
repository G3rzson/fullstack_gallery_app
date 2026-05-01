import { Request, Response, NextFunction } from "express";
import GaleryTitleModel from "../db/models/galleryTitle.model";
import { AppError } from "../errors/AppError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

// Middleware: max 2 gallery title per user
export async function limitGalleryTitlesMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError("User not authenticated.");
    }
    const count = await GaleryTitleModel.countDocuments({
      userId,
    });
    if (count >= 2) {
      throw new AppError("Max 2 galéria engedélyezett!", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
}
