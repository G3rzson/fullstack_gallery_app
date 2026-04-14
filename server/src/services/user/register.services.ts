import { createUser } from "../../db/userDal/user.repository";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
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
    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new InternalServerError("Felhasználó létrehozása sikertelen.");
  }
}
