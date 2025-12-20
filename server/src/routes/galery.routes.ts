import { Router } from "express";
import { galeryTitleCreateController } from "../controllers/galery/galeryTitleCreateController";
import { galeryTitleGetController } from "../controllers/galery/galeryTitleGetController";
import { galeryTitleDeleteController } from "../controllers/galery/galeryTitleDeleteController";
import { galeryTitleUpdateController } from "../controllers/galery/galeryTitleUpdateController";
import { galeryImageCreateController } from "../controllers/galery/galeryImageCreateController";
import { galeryImageGetController } from "../controllers/galery/galeryImageGetController";
import { galeryImageDeleteController } from "../controllers/galery/galeryImageDeleteController";
import { validateDataMW } from "../middlewares/validateData.mw";
import { galeryTitleFormSchema } from "../zodSchemas/galeryTitleFormSchema";
import { validateObjectIdMW } from "../middlewares/validateUrlObjectId.mw";
import { validateUrlParam } from "../middlewares/validateUrlParams.mw";
import { validateGaleryTitleExistsMW } from "../middlewares/validateGaleryTitleExists.mw";
import { uploadGaleryImagesMW } from "../middlewares/uploadGaleryImages.mw";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";
import { getUserFromTokenMW } from "../middlewares/getUserFromToken.mw";
import { myGaleryTitleGetController } from "../controllers/galery/myGaleryTitleGetController";

const galeryRouter = Router();

galeryRouter.post(
  "/title/create",
  verifyAccessTokenMW(),
  validateDataMW(galeryTitleFormSchema),
  galeryTitleCreateController
);

galeryRouter.get("/title/public", galeryTitleGetController);

galeryRouter.get(
  "/title/private",
  verifyAccessTokenMW(),
  myGaleryTitleGetController
);

// delete galery title
galeryRouter.delete(
  "/title/delete/:id",
  validateObjectIdMW("id"),
  galeryTitleDeleteController
);

/*
// update galery title
galeryRouter.put(
  "/title/update/:id",
  validateObjectIdMW("id"),
  validateDataMW(galeryTitleFormSchema),
  galeryTitleUpdateController
);*/

// Galery Image Routes
galeryRouter.post(
  "/image/upload/:url",
  validateUrlParam("url"),
  validateGaleryTitleExistsMW,
  uploadGaleryImagesMW,
  galeryImageCreateController
);

// get galery image
galeryRouter.get(
  "/image/get/:url",
  validateUrlParam("url"),
  getUserFromTokenMW(),
  galeryImageGetController
);

// delete galery image
galeryRouter.delete(
  "/image/delete/:id",
  validateObjectIdMW("id"),
  galeryImageDeleteController
);

export default galeryRouter;
