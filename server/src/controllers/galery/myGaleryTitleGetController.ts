import { NextFunction, Request, Response } from "express";
import { getMyGaleryTitleService } from "../../services/galery/getMyGaleryTitleService";

export async function myGaleryTitleGetController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req.username!;
    const galeryTitlesArray = await getMyGaleryTitleService(username);

    return res.status(200).json({
      success: true,
      message: "Galéria címek lekérve sikeresen!",
      data: galeryTitlesArray,
    });
  } catch (err) {
    next(err);
  }
}
