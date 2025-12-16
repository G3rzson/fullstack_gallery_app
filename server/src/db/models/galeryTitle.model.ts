import { Schema, model, models } from "mongoose";
import { GaleryTitleType } from "../../types/types";

export type GaleryTitleSchemaType = Omit<GaleryTitleType, "_id">;

const galeryTitleSchema = new Schema<GaleryTitleSchemaType>({
  galeryTitle: { type: String, required: true, unique: true },
  path: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
});

const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleSchemaType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
