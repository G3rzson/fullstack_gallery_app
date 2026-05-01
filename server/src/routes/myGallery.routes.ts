import { Router } from "express";
import { gallerySchema } from "../validation/gallerySchema";
import { validateDataMW } from "../middlewares/validateData.mw";
import { createGalleryController } from "../controllers/myGallery/createGallery.controller";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";
import { getGalleriesController } from "../controllers/myGallery/getGalleries.controller";
import { changeGalleryTitleAccessController } from "../controllers/myGallery/changeGalleryTitleAccess.controller";
import { deleteGalleryTitleController } from "../controllers/myGallery/deleteGalleryTitle.controller";
import { updateGalleryController } from "../controllers/myGallery/updateGallery.controller";
import { uploadGalleryImagesController } from "../controllers/myGallery/uploadGalleryImages.controller";
import { upload } from "../middlewares/multer.mw";
import { getGalleryImageController } from "../controllers/myGallery/getGalleryImage.controller";
import { deleteGalleryImageController } from "../controllers/myGallery/deleteGalleryImage.controller";
import { deleteManyGalleryImageController } from "../controllers/myGallery/deleteManyGalleryImage.controller";
import { limitGalleryTitlesMW } from "../middlewares/limitGalleryTitles.mw";
import { limitGalleryImagesMW } from "../middlewares/limitGalleryImages.mw";
import { getGalleryTitleController } from "../controllers/myGallery/getGalleryTitle.controller";

const myGalleryRouter = Router();

myGalleryRouter.get(
  "/my-gallery-titles",
  verifyAccessTokenMW(),
  getGalleriesController,
);

myGalleryRouter.get(
  "/my-gallery-titles/:galleryTitleId",
  verifyAccessTokenMW(),
  getGalleryImageController,
);

myGalleryRouter.get(
  "/my-gallery-titles/update/:galleryTitleId",
  verifyAccessTokenMW(),
  getGalleryTitleController,
);

myGalleryRouter.put(
  "/my-gallery-titles/:galleryTitleId",
  verifyAccessTokenMW(),
  changeGalleryTitleAccessController,
);
myGalleryRouter.post(
  "/my-gallery-titles/create",
  verifyAccessTokenMW(),
  limitGalleryTitlesMW,
  validateDataMW(gallerySchema),
  createGalleryController,
);
myGalleryRouter.put(
  "/my-gallery-titles/update/:galleryTitleId",
  verifyAccessTokenMW(),
  validateDataMW(gallerySchema),
  updateGalleryController,
);
myGalleryRouter.delete(
  "/my-gallery-titles/:galleryTitleId",
  verifyAccessTokenMW(),
  deleteGalleryTitleController,
);

myGalleryRouter.delete(
  "/my-gallery-titles/:galleryTitleId/:imageId",
  verifyAccessTokenMW(),
  deleteGalleryImageController,
);
myGalleryRouter.post(
  "/my-gallery-titles/:galleryTitleId/add",
  verifyAccessTokenMW(),
  limitGalleryImagesMW,
  upload.array("images"),
  uploadGalleryImagesController,
);
myGalleryRouter.post(
  "/my-gallery-titles/:galleryTitleId/delete-many",
  verifyAccessTokenMW(),
  deleteManyGalleryImageController,
);

export default myGalleryRouter;
