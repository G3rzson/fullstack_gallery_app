import { Router } from "express";
import { validateDataMW } from "../middlewares/validateData.mw";
import { registerSchema } from "../validation/registerSchema";
import { registerController } from "../controllers/user/register.controller";
import { loginSchema } from "../validation/loginSchema";
import { loginController } from "../controllers/user/login.controller";
import { logoutController } from "../controllers/user/logout.controller";
import { refreshController } from "../controllers/user/refresh.controller";
import { deleteAccountController } from "../controllers/user/deleteAccount.controller";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";

const userRouter = Router();

userRouter.post(
  "/user/register",
  validateDataMW(registerSchema),
  registerController,
);

userRouter.post("/user/login", validateDataMW(loginSchema), loginController);

userRouter.post("/user/logout", logoutController);

userRouter.post("/user/refresh", refreshController);

userRouter.post(
  "/user/delete-account/:userId",
  verifyAccessTokenMW(),
  deleteAccountController,
);

export default userRouter;
