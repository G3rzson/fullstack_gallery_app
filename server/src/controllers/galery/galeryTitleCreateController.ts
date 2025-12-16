import { Request, Response, NextFunction } from "express";
import { createGaleryService } from "../../services/galery.service";
import { GaleryTitleFormType } from "../../zodSchemas/galeryTitleFormSchema";

export async function galeryTitleCreateController(
  req: Request<{}, {}, GaleryTitleFormType>,
  res: Response,
  next: NextFunction
) {
  try {
    const { galeryTitle } = req.body;

    const galeryTitleObj = await createGaleryService(galeryTitle);

    res.status(201).json({
      success: true,
      message: "Galéria létrehozva",
      data: galeryTitleObj,
    });
  } catch (err) {
    next(err);
  }
}
