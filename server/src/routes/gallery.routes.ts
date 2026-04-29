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
import { upload } from "../middlewares/multer.mw";
import { getGalleryImageController } from "../controllers/gallery/getGalleryImage.controller";
import { getPublicGalleryImageController } from "../controllers/gallery/getPublicGalleryImage.controller";
import { deleteGalleryImageController } from "../controllers/gallery/deleteGalleryImage.controller";
import { deleteManyGalleryImageController } from "../controllers/gallery/deleteManyGalleryImage.controller";
import { limitGalleryTitlesMW } from "../middlewares/limitGalleryTitles.mw";
import { limitGalleryImagesMW } from "../middlewares/limitGalleryImages.mw";

const galleryRouter = Router();

galleryRouter.get("/title/public/get", getPublicGalleriesController);
galleryRouter.get("/image/public/get/:id", getPublicGalleryImageController);
galleryRouter.get("/title/get", verifyAccessTokenMW(), getGalleriesController);
galleryRouter.put(
  "/title/change-access/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  changeGalleryTitleAccessController,
);
galleryRouter.post(
  "/title/create",
  verifyAccessTokenMW(),
  limitGalleryTitlesMW,
  validateDataMW(gallerySchema),
  createGalleryController,
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
galleryRouter.delete(
  "/title/delete/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  deleteGalleryTitleController,
);
galleryRouter.get(
  "/image/get/:galleryId",
  verifyAccessTokenMW(),
  getGalleryImageController,
);
galleryRouter.delete(
  "/image/delete/:imageId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  deleteGalleryImageController,
);
galleryRouter.post(
  "/images/upload/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  limitGalleryImagesMW,
  upload.array("images"),
  uploadGalleryImagesController,
);
galleryRouter.delete(
  "/image/delete-many/:galleryId",
  verifyAccessTokenMW(),
  hasPermissionMW,
  deleteManyGalleryImageController,
);

export default galleryRouter;
