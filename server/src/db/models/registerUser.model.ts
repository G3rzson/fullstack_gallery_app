import { Schema, model, models, Document } from "mongoose";

export type RegisterUserSchemaType = Document & {
  username: string;
  email: string;
  password: string;
};

const registerUserSchema = new Schema<RegisterUserSchemaType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const RegisterUserModel =
  models.User || model<RegisterUserSchemaType>("User", registerUserSchema);
export { RegisterUserModel };
