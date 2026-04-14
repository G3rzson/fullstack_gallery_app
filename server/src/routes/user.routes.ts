import { Router } from "express";
import { validateDataMW } from "../middlewares/validateData.mw";
import { registerSchema } from "../validation/registerSchema";
import { registerController } from "../controllers/user/register.controller";

const userRouter = Router();

userRouter.post(
  "/register",
  validateDataMW(registerSchema),
  registerController,
);

export default userRouter;
