import { NextFunction, Request, Response } from "express";
import { GaleryTitleFormType } from "../../zodSchemas/galeryTitleFormSchema";
import { updateGaleryTitleService } from "../../services/galery/updateGaleryTitleService";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

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
    const { galeryTitle, isPrivate } = req.body;
    const username = req.username;

    if (!username) {
      throw new UnauthorizedError("Missing username");
    }

    const updatedGalery = await updateGaleryTitleService(
      id,
      galeryTitle,
      isPrivate,
      username
    );

    res.json({
      success: true,
      message: "Galéria sikeresen frissítve!",
      data: updatedGalery,
    });
  } catch (error) {
    next(error);
  }
}
