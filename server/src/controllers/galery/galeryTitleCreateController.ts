import { Request, Response, NextFunction } from "express";
import { GaleryTitleFormType } from "../../zodSchemas/galeryTitleFormSchema";
import { createGaleryTitleService } from "../../services/galery/createGaleryTitleService";

export async function galeryTitleCreateController(
  req: Request<{}, {}, GaleryTitleFormType>,
  res: Response,
  next: NextFunction
) {
  try {
    const { galeryTitle } = req.body;

    const galeryTitleObj = await createGaleryTitleService(galeryTitle);

    res.status(201).json({
      success: true,
      message: "Galéria létrehozva",
      data: galeryTitleObj,
    });
  } catch (err) {
    next(err);
  }
}
