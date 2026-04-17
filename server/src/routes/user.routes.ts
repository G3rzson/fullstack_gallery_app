import { Router } from "express";
import { validateDataMW } from "../middlewares/validateData.mw";
import { registerSchema } from "../validation/registerSchema";
import { registerController } from "../controllers/user/register.controller";
import { loginSchema } from "../validation/loginSchema";
import { loginController } from "../controllers/user/login.controller";
import { logoutController } from "../controllers/user/logout.controller";
import { refreshController } from "../controllers/user/refresh.controller";

const userRouter = Router();

userRouter.post(
  "/register",
  validateDataMW(registerSchema),
  registerController,
);

userRouter.post("/login", validateDataMW(loginSchema), loginController);

userRouter.post("/logout", logoutController);

userRouter.post("/refresh", refreshController);

export default userRouter;
