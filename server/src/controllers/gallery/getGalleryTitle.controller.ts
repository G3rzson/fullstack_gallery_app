import type { NextFunction, Request, Response } from "express";
import { getGalleryService } from "../../services/gallery/getGallery.services";

export async function getGalleryTitleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryId } = req.params as { galleryId: string };

    const gallery = await getGalleryService(galleryId);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Galéria nem található",
      });
    }

    res.status(200).json({
      success: true,
      message: "Galéria lekérve",
      data: {
        _id: gallery._id,
        gallery: gallery.galeryTitle,
        isPublic: gallery.isPublic,
      },
    });
  } catch (err) {
    next(err);
  }
}
