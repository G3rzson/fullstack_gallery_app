import { NextFunction, Request, Response } from "express";
import GaleryTitleModel from "../db/models/galeryTitle.model";
import { NotFoundError } from "../errors/NotFoundError";

export async function validateGaleryTitleExistsMW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { url } = req.params;

  const galery = await GaleryTitleModel.findOne({ url });
  if (!galery) {
    throw new NotFoundError("Galéria nem található");
  }

  (req as any).galery = galery;
  next();
}
