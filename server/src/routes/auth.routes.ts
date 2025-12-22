import { Router } from "express";
import { registerUserController } from "../controllers/auth/registerUserController";
import { logoutUserController } from "../controllers/auth/logoutUserController";
import { loginUserController } from "../controllers/auth/loginUserController";
import { refreshTokenController } from "../controllers/auth/refreshTokenController";
import { validateDataMW } from "../middlewares/validateData.mw";
import { registerFormSchema } from "../zodSchemas/registerFormSchema";
import { loginFormSchema } from "../zodSchemas/loginFormSchema";
import { deleteAccountController } from "../controllers/auth/deleteAccountController";
import { verifyAccessTokenMW } from "../middlewares/verifyAccessTokenMW";

const authRouter = Router();

authRouter.post(
  "/register",
  validateDataMW(registerFormSchema),
  registerUserController
);

authRouter.post("/login", validateDataMW(loginFormSchema), loginUserController);

authRouter.post("/logout", logoutUserController);

authRouter.post("/refresh", refreshTokenController);

authRouter.delete(
  "/delete-account",
  verifyAccessTokenMW(),
  deleteAccountController
);

export default authRouter;
