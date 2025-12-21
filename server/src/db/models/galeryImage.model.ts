import { Schema, model, models, type Types } from "mongoose";

export type GaleryImageSchemaType = {
  _id?: Types.ObjectId;
  filename: string;
  url: string;
  galeryUrl: string;
  createdAt: Date;
  createdBy: string;
};

export type GaleryImageLeanType = GaleryImageSchemaType & {
  _id: Types.ObjectId;
};

const galeryImageSchema = new Schema<GaleryImageSchemaType>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  galeryUrl: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  createdBy: { type: String, required: true },
});

const GaleryImageModel =
  models.GaleryImage ||
  model<GaleryImageSchemaType>("GaleryImage", galeryImageSchema);
export default GaleryImageModel;
