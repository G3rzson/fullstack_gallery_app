import {
  RegisterUserModel,
  RegisterUserSchemaType,
} from "../models/registerUser.model";

export async function checkExistingUser(
  username: string,
  email: string
): Promise<RegisterUserSchemaType | null> {
  return await RegisterUserModel.findOne({
    $or: [{ username }, { email }],
  }).exec();
}

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string
): Promise<RegisterUserSchemaType> {
  return await RegisterUserModel.create({
    username,
    email,
    password: hashedPassword,
  });
}

export async function findUserByUsername(
  username: string
): Promise<RegisterUserSchemaType | null> {
  return await RegisterUserModel.findOne({ username }).exec();
}
