import { NextFunction, Request, Response } from "express";
import { getGaleryTitlesService } from "../../services/galery.service";

export async function galeryTitleGetController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const galeryTitles = await getGaleryTitlesService();

    return res.status(200).json({
      success: true,
      message: "Galéria címek lekérve sikeresen!",
      data: galeryTitles,
    });
  } catch (err) {
    next(err);
  }
}
