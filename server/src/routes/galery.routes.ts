import { Router } from "express";
import { galeryTitleCreateController } from "../controllers/galery/galeryTitleCreateController";
import { galeryTitleGetController } from "../controllers/galery/galeryTitleGetController";
import { galeryTitleDeleteController } from "../controllers/galery/galeryTitleDeleteController";
import { galeryTitleUpdateController } from "../controllers/galery/galeryTitleUpdateController";
import {
  galeryImageCreate,
  uploadGaleryImagesMW,
} from "../controllers/galeryImageCreate";
import { galeryImageGet } from "../controllers/galeryImageGet";
import { galeryImageDelete } from "../controllers/galeryImageDelete";
import { validateDataMW } from "../middlewares/validateData.mw";
import { galeryTitleFormSchema } from "../zodSchemas/galeryTitleFormSchema";
import { validateObjectIdMW } from "../middlewares/validateUrlObjectId.mw";

const galeryRouter = Router();

// create galery title
galeryRouter.post(
  "/title/create",
  validateDataMW(galeryTitleFormSchema),
  galeryTitleCreateController
);
// read galery title
galeryRouter.get("/title/get", galeryTitleGetController);

// delete galery title
galeryRouter.delete(
  "/title/delete/:id",
  validateObjectIdMW("id"),
  galeryTitleDeleteController
);

// update galery title
galeryRouter.put(
  "/title/update/:id",
  validateObjectIdMW("id"),
  validateDataMW(galeryTitleFormSchema),
  galeryTitleUpdateController
);

// Galery Image Routes
galeryRouter.post(
  "/image/upload/:url",
  uploadGaleryImagesMW,
  galeryImageCreate
);
galeryRouter.get("/image/get/:url", galeryImageGet);
galeryRouter.delete("/image/delete/:id", galeryImageDelete);

export default galeryRouter;
