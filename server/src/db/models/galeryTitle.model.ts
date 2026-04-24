import { Schema, model, models } from "mongoose";

export type GaleryTitleSchemaType = {
  galeryTitle: string;
  createdBy: string;
  isPublic: boolean;
};

const galeryTitleSchema = new Schema<GaleryTitleSchemaType>({
  galeryTitle: { type: String, required: true },
  createdBy: { type: String, required: true },
  isPublic: { type: Boolean, required: true, default: false },
});

const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleSchemaType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
