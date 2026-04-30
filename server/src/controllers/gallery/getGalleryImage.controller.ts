import type { NextFunction, Request, Response } from "express";
import { getGalleryImageService } from "../../services/gallery/getGalleryImage.services";

export async function getGalleryImageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const galleryTitleId = req.params.galleryTitleId as string;

    const galleryImages = await getGalleryImageService(galleryTitleId);

    if (!galleryImages) {
      throw new Error("Galéria képek lekérése sikertelen.");
    }
    res.status(200).json({
      success: true,
      message: "Galéria képek lekérve",
      data: galleryImages,
    });
  } catch (err) {
    next(err);
  }
}
