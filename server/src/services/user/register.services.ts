import { createUser } from "../../db/dal/user.repository";
import { errorHandler } from "../../functions/errorHandler";
import { type RegisterSchemaType } from "../../validation/registerSchema";
import bcrypt from "bcrypt";

export async function registerUserService({
  username,
  email,
  password,
}: RegisterSchemaType) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(username, email, hashedPassword);
  } catch (error) {
    errorHandler(error);
  }
}
