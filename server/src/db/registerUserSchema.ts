import { Schema, model, models } from "mongoose";

type RegisterUserType = {
  username: string;
  email: string;
  password: string;
};

// Schema
const registerUserSchema = new Schema<RegisterUserType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Model
const RegisterUserModel =
  models.User || model<RegisterUserType>("User", registerUserSchema);

export default RegisterUserModel;
