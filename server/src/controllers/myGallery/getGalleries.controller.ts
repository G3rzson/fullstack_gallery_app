import type { NextFunction, Request, Response } from "express";
import { getGalleriesService } from "../../services/myGallery/getGalleries.services";

export async function getGalleriesController(
  req: Request<{}, {}, {}, { search?: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId as string;
    const search = req.query.search;

    const galleries = await getGalleriesService(userId, search);

    res.status(200).json({
      success: true,
      message: "Galériák lekérve",
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
}
