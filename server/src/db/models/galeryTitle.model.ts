import { Schema, model, models } from "mongoose";

export type GaleryTitleSchemaType = {
  galeryTitle: string;
  path: string;
  url: string;
  createdBy: string;
  isPrivate: boolean;
};

const galeryTitleSchema = new Schema<GaleryTitleSchemaType>({
  galeryTitle: { type: String, required: true, unique: true },
  path: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true },
  isPrivate: { type: Boolean, required: true, default: false },
});

const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleSchemaType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
