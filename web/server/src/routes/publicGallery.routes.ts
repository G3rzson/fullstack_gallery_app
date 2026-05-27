import { Router } from "express";
import { getPublicGalleriesController } from "../controllers/publicGallery/getPublicGalleries.controller";
import { getPublicGalleryImageController } from "../controllers/publicGallery/getPublicGalleryImage.controller";

const publicGalleryRouter = Router();

publicGalleryRouter.get("/public-gallery-titles", getPublicGalleriesController);

publicGalleryRouter.get(
  "/public-gallery-titles/:galleryTitleId",
  getPublicGalleryImageController,
);

export default publicGalleryRouter;
