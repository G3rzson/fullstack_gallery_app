import { Request, Response, NextFunction } from "express";
import { getGaleryImagesService } from "../../services/galery/getGaleryImageByUrlService";

export async function galeryImageGetController(
  req: Request<{ url: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { url } = req.params;

    const images = await getGaleryImagesService(url, req.username);

    res.json({
      success: true,
      message: "Képek sikeresen lekérve",
      data: images,
    });
  } catch (error) {
    next(error);
  }
}
