import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { getAllGalleryTitlesByIdService } from "../../services/admin/getAllGalleryTitleById.services";

export async function getGalleryTitlesByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId as string;
    const search = req.query.search as string | undefined;

    if (!userId) {
      throw new UnauthorizedError("User ID is required.");
    }

    const galleryTitles = await getAllGalleryTitlesByIdService(userId, search);

    res.status(200).json({
      success: true,
      message: "Gallery címek lekérve",
      data: galleryTitles,
    });
  } catch (err) {
    next(err);
  }
}
