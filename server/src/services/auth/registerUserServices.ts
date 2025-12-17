import bcrypt from "bcryptjs";
import { RegisterUserModel } from "../../db/models/registerUser.model";
import { BadRequestError } from "../../errors/BadRequestError";

type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

export async function registerUserService({
  username,
  email,
  password,
}: RegisterInput) {
  const existingUser = await RegisterUserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new BadRequestError("Username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await RegisterUserModel.create({
    username,
    email,
    password: hashedPassword,
  });
}
