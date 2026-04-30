import { Router } from "express";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";
import { getAllUsersController } from "../controllers/admin/getAllUsers.controller";
import { getGalleryTitlesByIdController } from "../controllers/admin/getGalleryTitlesById.controller";
import { getGalleryImagesByIdController } from "../controllers/admin/getGalleryImagesById.controller";
import { isAdminMW } from "../middlewares/isAdmin.mw";

const adminRouter = Router();

adminRouter.get(
  "/admin/users",
  verifyAccessTokenMW(),
  isAdminMW,
  getAllUsersController,
);

adminRouter.get(
  "/admin/users/:userId",
  verifyAccessTokenMW(),
  isAdminMW,
  getGalleryTitlesByIdController,
);

adminRouter.get(
  "/admin/users/:userId/:galleryTitleId",
  verifyAccessTokenMW(),
  isAdminMW,
  getGalleryImagesByIdController,
);

export default adminRouter;
