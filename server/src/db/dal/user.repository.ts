import { Schema } from "mongoose";
import RegisterModel, {
  type RegisterDocumentType,
} from "../models/register.model";

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string,
): Promise<void> {
  await RegisterModel.create({
    username,
    email,
    password: hashedPassword,
  });
}

export async function findUserByUsername(
  username: string,
): Promise<RegisterDocumentType | null> {
  return await RegisterModel.findOne({ username });
}

export async function deleteUserByUsername(username: string): Promise<void> {
  await RegisterModel.findOneAndDelete({ username });
}

export async function getAllUsers(
  filter: Record<string, any>,
): Promise<RegisterDocumentType[]> {
  return RegisterModel.find(filter).select("-password -__v");
}
