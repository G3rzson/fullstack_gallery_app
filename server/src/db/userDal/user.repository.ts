import { RegisterModel } from "../models/register.model";

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string,
) {
  return await RegisterModel.create({
    username,
    email,
    password: hashedPassword,
  });
}
