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

export async function findUserById(
  userId: string,
): Promise<RegisterDocumentType | null> {
  return await RegisterModel.findById(userId);
}

export async function findUserByUsername(
  username: string,
): Promise<RegisterDocumentType | null> {
  return await RegisterModel.findOne({ username });
}

export async function deleteUserById(userId: string): Promise<void> {
  await RegisterModel.findByIdAndDelete(userId);
}

export async function getAllUsers(
  filter: Record<string, any>,
): Promise<RegisterDocumentType[]> {
  return RegisterModel.find(filter).select("-password -__v");
}
