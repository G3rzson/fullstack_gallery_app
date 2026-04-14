import { Schema, model, models } from "mongoose";

export type RegisterSchemaType = {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

const registerSchema = new Schema<RegisterSchemaType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

const RegisterModel =
  models.User || model<RegisterSchemaType>("User", registerSchema);
export { RegisterModel };
