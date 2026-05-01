import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import GaleryImageModel from "../db/models/galleryImage.model";

// Middleware: max 6 gallery images per user
export async function limitGalleryImagesMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError("User not authenticated.");
    }
    const count = await GaleryImageModel.countDocuments({
      userId,
    });
    if (count >= 6) {
      throw new AppError("Max 6 kép engedélyezett!", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
}
