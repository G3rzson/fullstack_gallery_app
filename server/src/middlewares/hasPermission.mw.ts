import type { Request, Response, NextFunction } from "express";
import { getGalleryByUsername } from "../db/dal/galery.repository";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { errorHandler } from "../functions/errorHandler";

export async function hasPermissionMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const username = req.username;
    if (!username) {
      throw new UnauthorizedError("Unauthorized");
    }

    const galleryObj = await getGalleryByUsername(username);
    if (!galleryObj) {
      throw new NotFoundError("Gallery not found");
    }

    if (galleryObj.createdBy !== username) {
      throw new BadRequestError("Forbidden");
    }

    next();
  } catch (error) {
    errorHandler(error);
  }
}
