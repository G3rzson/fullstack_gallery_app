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
    const userId = req._id;
    if (!userId) {
      throw new UnauthorizedError("User not authenticated.");
    }
    const existingCount = await GaleryImageModel.countDocuments({ userId });
    const incomingFiles = (req.files as Express.Multer.File[]) || [];
    const incomingCount = incomingFiles.length;
    if (existingCount + incomingCount > 6) {
      throw new AppError(
        `Maximum 6 kép lehet! (jelenleg: ${existingCount}, feltöltés: ${incomingCount})`,
        403,
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}
