import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { getAllGalleryImagesByIdService } from "../../services/admin/getAllGalleryImageById.services";

export async function getGalleryImagesByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const galleryTitleId = req.params.galleryTitleId as string;

    if (!galleryTitleId) {
      throw new UnauthorizedError("Gallery Title ID is required.");
    }

    const galleryImages = await getAllGalleryImagesByIdService(galleryTitleId);

    res.status(200).json({
      success: true,
      message: "Gallery képek lekérve",
      data: galleryImages,
    });
  } catch (err) {
    console.error("Error in getGalleryImagesByIdController:", err);
    next(err);
  }
}
