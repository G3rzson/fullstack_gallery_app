import type { NextFunction, Request, Response } from "express";
import { getGalleryImageService } from "../../services/gallery/getGalleryImage.services";

export async function getGalleryImageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const username = req.username ?? "unknown";
    const galleryId = req.params.galleryId as string;

    const galleryImages = await getGalleryImageService(username, galleryId);

    if (!galleryImages) {
      return res.status(404).json({
        success: false,
        message: "Galéria képek nem találhatók",
      });
    }

    res.status(200).json({
      success: true,
      message: "Galéria képek lekérve",
      data: galleryImages,
    });
  } catch (err) {
    console.error("Hiba a galéria képek lekérésekor:", err);
    next(err);
  }
}
