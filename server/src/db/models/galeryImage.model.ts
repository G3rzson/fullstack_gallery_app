import { Schema, model, models } from "mongoose";
import { GaleryImageType } from "../../types/types";

export type galeryImageSchemaType = Omit<GaleryImageType, "_id">;

const galeryImageSchema = new Schema<galeryImageSchemaType>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  galeryUrl: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const GaleryImageModel =
  models.GaleryImage ||
  model<galeryImageSchemaType>("GaleryImage", galeryImageSchema);
export default GaleryImageModel;
