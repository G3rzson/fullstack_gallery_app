import { Router } from "express";
import { gallerySchema } from "../validation/gallerySchema";
import { validateDataMW } from "../middlewares/validateData.mw";
import { createGalleryController } from "../controllers/gallery/createGallery.controller";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";
import { getGalleriesController } from "../controllers/gallery/getGalleries.controller";
import { getPublicGalleriesController } from "../controllers/gallery/getPublicGalleries.controller";
import { changeGalleryTitleAccessController } from "../controllers/gallery/changeGalleryTitleAccess.controller";
import { hasPermissionMW } from "../middlewares/hasPermission.mw";
import { deleteGalleryTitleController } from "../controllers/gallery/deleteGalleryTitle.controller";
import { getGalleryTitleController } from "../controllers/gallery/getGalleryTitle.controller";
import { updateGalleryController } from "../controllers/gallery/updateGallery.controller";
import { uploadGalleryImagesController } from "../controllers/gallery/uploadGalleryImages.controller";

const galleryRouter = Router();

galleryRouter.post(
  "/title/create",
  verifyAccessTokenMW(),
  validateDataMW(gallerySchema),
  createGalleryController,
);

galleryRouter.get("/title/get", verifyAccessTokenMW(), getGalleriesController);
galleryRouter.get("/title/public/get", getPublicGalleriesController);
galleryRouter.put(
  "/title/change-access/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  changeGalleryTitleAccessController,
);

galleryRouter.delete(
  "/title/delete/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  deleteGalleryTitleController,
);

galleryRouter.get(
  "/title/get/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  getGalleryTitleController,
);

galleryRouter.put(
  "/title/update/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  validateDataMW(gallerySchema),
  updateGalleryController,
);

galleryRouter.post(
  "/images/upload/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  uploadGalleryImagesController,
);

export default galleryRouter;
