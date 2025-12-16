import { Schema, model, models } from "mongoose";
import { RegisterUserType } from "../../types/types";

export type RegisterUserSchemaType = Omit<RegisterUserType, "_id">;

const registerUserSchema = new Schema<RegisterUserSchemaType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const RegisterUserModel =
  models.User || model<RegisterUserSchemaType>("User", registerUserSchema);
export { RegisterUserModel };
