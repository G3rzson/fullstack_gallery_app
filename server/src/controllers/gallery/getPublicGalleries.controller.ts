import type { NextFunction, Request, Response } from "express";
import { getPublicGalleriesService } from "../../services/gallery/getPublicGalleries.services";

export async function getPublicGalleriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const galleries = await getPublicGalleriesService();

    res.status(200).json({
      success: true,
      message: "Galériák lekérve",
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
}
