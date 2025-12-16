import { Router } from "express";
import { loginUser } from "../controllers/loginUser";
import { registerUser } from "../controllers/registerUser";
import { logoutUser } from "../controllers/logoutUser";
import { refreshToken } from "../controllers/refreshToken";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;
