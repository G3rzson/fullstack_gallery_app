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
  userObj: { username: string; role: "USER" | "ADMIN" };
  refreshToken: string;
}> {
  try {
    const userObj = await findUserByUsername(username);

    if (!userObj) {
      throw new NotFoundError("Felhasználó nem található.");
    }

    const isValid = await validatePassword(password, userObj.password);
    if (!isValid) {
      throw new UnauthorizedError("Érvénytelen jelszó.");
    }

    const tokenPayload = {
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
      userObj: tokenPayload,
      refreshToken,
    };
  } catch (error) {
    errorHandler(error);
  }
}
