import { Schema, model, models } from "mongoose";

export type RegisterUserSchemaType = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

const registerUserSchema = new Schema<RegisterUserSchemaType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const RegisterUserModel =
  models.User || model<RegisterUserSchemaType>("User", registerUserSchema);
export { RegisterUserModel };
