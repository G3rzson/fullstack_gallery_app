import type { NextFunction, Request, Response } from "express";
import { getPublicGalleriesService } from "../../services/gallery/getPublicGalleries.services";

export async function getPublicGalleriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const galleries = await getPublicGalleriesService();

    const transformedGalleries = galleries.map((gallery: any) => ({
      _id: gallery._id,
      gallery: gallery.galeryTitle,
      isPublic: gallery.isPublic,
    }));

    res.status(200).json({
      success: true,
      message: "Galériák lekérve",
      data: transformedGalleries,
    });
  } catch (err) {
    next(err);
  }
}
