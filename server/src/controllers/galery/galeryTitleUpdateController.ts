import { NextFunction, Request, Response } from "express";
import { GaleryTitleFormType } from "../../zodSchemas/galeryTitleFormSchema";
import { updateGaleryService } from "../../services/galery.service";

type GaleryParams = {
  id: string;
};

export async function galeryTitleUpdateController(
  req: Request<GaleryParams, {}, GaleryTitleFormType>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { galeryTitle } = req.body;

    const updatedGalery = await updateGaleryService(id, galeryTitle);

    res.json({
      success: true,
      message: "Galéria sikeresen frissítve!",
      data: updatedGalery,
    });
  } catch (error) {
    next(error);
  }
}
