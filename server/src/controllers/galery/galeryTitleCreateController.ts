import { Request, Response, NextFunction } from "express";
import { GaleryTitleFormType } from "../../zodSchemas/galeryTitleFormSchema";
import { createGaleryTitleService } from "../../services/galery/createGaleryTitleService";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export async function galeryTitleCreateController(
  req: Request<{}, {}, GaleryTitleFormType>,
  res: Response,
  next: NextFunction
) {
  try {
    const { galeryTitle, isPrivate } = req.body;
    const username = req.username;

    if (!username) {
      throw new UnauthorizedError("Missing username");
    }

    const galeryTitleObj = await createGaleryTitleService(
      galeryTitle,
      isPrivate,
      username
    );

    res.status(201).json({
      success: true,
      message: "Galéria létrehozva",
      data: galeryTitleObj,
    });
  } catch (err) {
    next(err);
  }
}
