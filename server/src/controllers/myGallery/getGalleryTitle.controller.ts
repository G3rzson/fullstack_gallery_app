import type { NextFunction, Request, Response } from "express";
import { getGalleryService } from "../../services/myGallery/getGallery.services";
import { NotFoundError } from "../../errors/NotFoundError";

// mi ez torolni ?
export async function getGalleryTitleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryTitleId } = req.params as { galleryTitleId: string };

    const gallery = await getGalleryService(galleryTitleId);

    if (!gallery) {
      throw new NotFoundError("Galéria nem található.");
    }

    res.status(200).json({
      success: true,
      message: "Galéria lekérve",
      data: gallery,
    });
  } catch (err) {
    next(err);
  }
}
