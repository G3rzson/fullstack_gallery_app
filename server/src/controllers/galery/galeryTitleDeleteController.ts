import { NextFunction, Request, Response } from "express";
import { deleteGaleryTitleService } from "../../services/galery/deleteGaleryTitleService";

export async function galeryTitleDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await deleteGaleryTitleService(id);

    res.json({
      success: true,
      message: "A galéria és a hozzá tartozó képek sikeresen törölve lettek.",
    });
  } catch (error) {
    next(error);
  }
}
