import { Router } from "express";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";
import { getAllUsersController } from "../controllers/admin/getAllUsers.controller";
import { getGalleryTitlesByUserIdController } from "../controllers/admin/getGalleryTitlesByUserId.controller";
import { getGalleryImagesByIdController } from "../controllers/admin/getGalleryImagesById.controller";
import { isAdminMW } from "../middlewares/isAdmin.mw";
import { deleteGalleryImageController } from "../controllers/myGallery/deleteGalleryImage.controller";
import { deleteGalleryTitleController } from "../controllers/myGallery/deleteGalleryTitle.controller";
import { deleteAccountController } from "../controllers/user/deleteAccount.controller";

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
  getGalleryTitlesByUserIdController,
);

adminRouter.get(
  "/admin/users/:userId/:galleryTitleId",
  verifyAccessTokenMW(),
  isAdminMW,
  getGalleryImagesByIdController,
);

adminRouter.delete(
  "/admin/users/:userId/:galleryTitleId/:imageId",
  verifyAccessTokenMW(),
  isAdminMW,
  deleteGalleryImageController,
);

adminRouter.delete(
  "/admin/users/:userId/:galleryTitleId",
  verifyAccessTokenMW(),
  isAdminMW,
  deleteGalleryTitleController,
);

adminRouter.post(
  "/admin/users/:userId",
  verifyAccessTokenMW(),
  isAdminMW,
  deleteAccountController,
);

export default adminRouter;
