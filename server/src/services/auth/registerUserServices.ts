import bcrypt from "bcryptjs";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { RegisterFormType } from "../../zodSchemas/registerFormSchema";
import {
  createUser,
  checkExistingUser,
} from "../../db/repositories/auth.repository";

export async function registerUserService({
  username,
  email,
  password,
}: RegisterFormType) {
  try {
    const existingUser = await checkExistingUser(username, email);
    if (existingUser) {
      throw new BadRequestError("A felhasználónév vagy email már foglalt.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(username, email, hashedPassword);
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new InternalServerError("Felhasználó létrehozása sikertelen.");
  }
}
