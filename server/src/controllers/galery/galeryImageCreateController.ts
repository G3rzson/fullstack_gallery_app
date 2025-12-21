import { Request, Response, NextFunction } from "express";
import GaleryImageModel from "../../db/models/galeryImage.model";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import {
  createGaleryImage,
  findGaleryTitleByUrl,
} from "../../db/repositories/galery.repository";
import path from "path";
import { UPLOADS_DIR, resolveFromRepo, toPosixPath } from "../../config/paths";

export async function galeryImageCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Express.Multer.File[];

    const slug = req.params.url;
    const username = req.username;

    if (!username) {
      throw new UnauthorizedError("Missing username");
    }

    if (!slug) {
      throw new NotFoundError("Galéria nem található");
    }

    if (!files || files.length === 0) {
      throw new BadRequestError("Nincsenek feltöltött fájlok");
    }

    const galery = await findGaleryTitleByUrl(slug);
    if (!galery) throw new NotFoundError("Galéria nem található");
    if (galery.createdBy !== username) {
      throw new UnauthorizedError("Nincs jogosultságod ehhez a galériához");
    }

    const absoluteGaleryDir = resolveFromRepo(galery.path);
    const relativeDir = toPosixPath(
      path.relative(UPLOADS_DIR, absoluteGaleryDir)
    ).replace(/^\/+/, "");

    const saved = files.map((f) => ({
      filename: f.filename,
      url: `/uploads/${relativeDir}/${f.filename}`,
      galeryUrl: slug,
      createdBy: username,
      createdAt: new Date(),
    }));

    const savedImages = await createGaleryImage(saved);

    res.json({
      success: true,
      message: "Képek sikeresen feltöltve",
      data: savedImages,
    });
  } catch (error) {
    next(error);
  }
}
