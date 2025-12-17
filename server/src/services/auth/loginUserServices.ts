import bcrypt from "bcryptjs";
import { RegisterUserModel } from "../../db/models/registerUser.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export async function loginUserService(username: string, password: string) {
  const user = await RegisterUserModel.findOne({ username });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new UnauthorizedError("Invalid password");
  }

  const accessToken = generateAccessToken(user.username);
  const refreshToken = generateRefreshToken(user.username);

  return {
    accessToken,
    user: {
      username: user.username,
      refreshToken,
    },
  };
}
