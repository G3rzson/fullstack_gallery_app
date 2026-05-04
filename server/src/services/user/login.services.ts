import { findUserByUsername } from "../../db/dal/user.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { errorHandler } from "../../functions/errorHandler";
import {
  generateAccessToken,
  generateRefreshToken,
  getJwtSecrets,
} from "../../functions/jwt";
import { LoginSchemaType } from "../../validation/loginSchema";
import { validatePassword } from "../../validation/validatePassword";

export async function loginUserService({
  username,
  password,
}: LoginSchemaType): Promise<{
  accessToken: string;
  userObj: { _id: string; username: string; role: "USER" | "ADMIN" };
  refreshToken: string;
}> {
  try {
    const userObj = await findUserByUsername(username);
    if (!userObj) {
      throw new NotFoundError("Érvénytelen felhasználónév vagy jelszó.");
    }

    const isValid = await validatePassword(password, userObj.password);
    if (!isValid) {
      throw new UnauthorizedError("Érvénytelen felhasználónév vagy jelszó.");
    }

    const tokenPayload = {
      _id: userObj._id.toString(),
      username: userObj.username,
      role: userObj.role,
    };

    const secrets = getJwtSecrets();
    if (!secrets) {
      throw new Error("JWT titkok nincsenek beállítva.");
    }

    const accessToken = generateAccessToken(
      tokenPayload,
      secrets.accessTokenSecret,
    );
    const refreshToken = generateRefreshToken(
      tokenPayload,
      secrets.refreshTokenSecret,
    );

    return {
      accessToken,
      userObj: {
        _id: userObj._id.toString(),
        username: userObj.username,
        role: userObj.role,
      },
      refreshToken,
    };
  } catch (error) {
    errorHandler(error);
  }
}
