import { Schema, model, models, Document } from "mongoose";

export interface RegisterSchemaType {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt?: Date;
}

export interface RegisterDocumentType extends RegisterSchemaType, Document {}

const registerSchema = new Schema<RegisterDocumentType>({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    unique: true,
  },
  email: { type: String, required: true, trim: true, unique: true },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  createdAt: { type: Date, default: Date.now },
});

const RegisterModel =
  models.User || model<RegisterDocumentType>("User", registerSchema);

export default RegisterModel;
