import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { getGaleryTitleByIdService } from "../../services/galery/getGaleryTitleByIdService";

type GaleryParams = {
  id: string;
};

export async function galeryTitleGetOneController(
  req: Request<GaleryParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const username = req.username;

    if (!username) {
      throw new UnauthorizedError("Missing username");
    }

    const galeryObj = await getGaleryTitleByIdService(id, username);

    return res.status(200).json({
      success: true,
      message: "Galéria lekérve sikeresen!",
      data: galeryObj,
    });
  } catch (err) {
    next(err);
  }
}
