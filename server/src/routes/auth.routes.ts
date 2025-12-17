import { Router } from "express";
import { registerUserController } from "../controllers/auth/registerUserController";
import { logoutUserController } from "../controllers/auth/logoutUserController";
import { loginUserController } from "../controllers/auth/loginUserController";
import { refreshTokenController } from "../controllers/auth/refreshTokenController";

const authRouter = Router();

// Login route
authRouter.post("/login", loginUserController);

// Register route
authRouter.post("/register", registerUserController);

// Logout route
authRouter.post("/logout", logoutUserController);

// Refresh token route
authRouter.post("/refresh", refreshTokenController);

export default authRouter;
