import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { getGalleryTitleById } from "../db/dal/gallery.repository";

// Admin: bárki erőforrásához hozzáférhet
// User: csak a saját erőforrásához férhet hozzá
export async function hasPermissionMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const loggedInUserId = req._id;
    const loggedInUserRole = req.userRole;

    if (!loggedInUserId) {
      throw new UnauthorizedError("Hitelesítés szükséges.");
    }

    // Admin mindent elérhet
    if (loggedInUserRole === "ADMIN") {
      return next();
    }

    // Lekérjük az erőforrást (gallery title) a route param alapján
    const galleryTitleId = req.params.galleryTitleId as string;
    if (!galleryTitleId) {
      throw new AppError("Hiányzó erőforrás azonosító.", 400);
    }

    const galleryTitle = await getGalleryTitleById(galleryTitleId);
    if (!galleryTitle) {
      throw new NotFoundError("Galéria nem található.");
    }

    // Ellenőrizzük hogy a bejelentkezett user a tulajdonos-e
    if (galleryTitle.userId !== loggedInUserId) {
      throw new AppError("Nincs jogosultságod ehhez a művelethez.", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}
