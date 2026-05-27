import type { NextFunction, Request, Response } from "express";
import { getPublicGalleriesService } from "../../services/publicGallery/getPublicGalleries.services";

export async function getPublicGalleriesController(
  req: Request<{}, {}, {}, { search?: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const search = req.query.search;

    const galleries = await getPublicGalleriesService(search);

    res.status(200).json({
      success: true,
      message: "Galériák lekérve",
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
}
