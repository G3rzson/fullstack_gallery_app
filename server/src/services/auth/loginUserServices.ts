import { NotFoundError } from "../../errors/NotFoundError";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { LoginFormType } from "../../zodSchemas/loginFormSchema";
import { findUserByUsername } from "../../db/repositories/auth.repository";
import { validatePassword } from "../../utils/validatePassword";

export async function loginUserService({
  username,
  password,
}: LoginFormType): Promise<{
  accessToken: string;
  userObj: { username: string; role: "admin" | "user" };
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

    const accessToken = generateAccessToken({
      username: userObj.username,
      role: userObj.role,
    });
    const refreshToken = generateRefreshToken({
      username: userObj.username,
      role: userObj.role,
    });

    return {
      accessToken,
      userObj: { username: userObj.username, role: userObj.role },
      refreshToken,
    };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new Error("Bejelentkezés sikertelen.");
  }
}
