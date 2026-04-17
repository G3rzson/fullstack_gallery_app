import { Router } from "express";
import { gallerySchema } from "../validation/gallerySchema";
import { validateDataMW } from "../middlewares/validateData.mw";
import { createGalleryController } from "../controllers/gallery/createGallery.controller";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";
import { getGalleriesController } from "../controllers/gallery/getGalleries.controller";
import { getPublicGalleriesController } from "../controllers/gallery/getPublicGalleries.controller";

const galleryRouter = Router();

galleryRouter.post(
  "/title/create",
  verifyAccessTokenMW(),
  validateDataMW(gallerySchema),
  createGalleryController,
);

galleryRouter.get("/title/get", verifyAccessTokenMW(), getGalleriesController);
galleryRouter.get("/title/public/get", getPublicGalleriesController);

export default galleryRouter;
