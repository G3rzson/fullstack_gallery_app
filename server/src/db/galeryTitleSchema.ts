import { Schema, model, models } from "mongoose";
import { GaleryTitleType } from "../types/types";

type GaleryTitleSchemaType = Omit<GaleryTitleType, "_id">;

// Schema
const galeryTitleSchema = new Schema<GaleryTitleSchemaType>({
  galeryTitle: { type: String, required: true, unique: true },
  path: { type: String },
  url: { type: String },
});
// Model
const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleSchemaType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
