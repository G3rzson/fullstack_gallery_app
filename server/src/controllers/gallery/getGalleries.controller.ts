import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { getGalleriesService } from "../../services/gallery/getGalleries.services";

export async function getGalleriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const username = req.username;
    const search = req.query.search as string | undefined;

    if (!username) {
      throw new UnauthorizedError("Missing username");
    }

    const galleries = await getGalleriesService(username, search);

    res.status(200).json({
      success: true,
      message: "Galériák lekérve",
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
}
