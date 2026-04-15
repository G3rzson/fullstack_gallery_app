import { Router } from "express";
import { validateDataMW } from "../middlewares/validateData.mw";
import { registerSchema } from "../validation/registerSchema";
import { registerController } from "../controllers/user/register.controller";
import { loginSchema } from "../validation/loginSchema";
import { loginController } from "../controllers/user/login.controller";
import { logoutController } from "../controllers/user/logout.controller";

const userRouter = Router();

userRouter.post(
  "/register",
  validateDataMW(registerSchema),
  registerController,
);

userRouter.post("/login", validateDataMW(loginSchema), loginController);

userRouter.post("/logout", logoutController);

export default userRouter;
