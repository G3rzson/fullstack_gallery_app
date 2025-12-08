import { Schema, model, models } from "mongoose";

type GaleryTitleType = {
  galeryTitle: string;
  path: string;
  url: string;
};

// Schema
const galeryTitleSchema = new Schema<GaleryTitleType>({
  galeryTitle: { type: String, required: true, unique: true },
  path: { type: String },
  url: { type: String },
});
// Model
const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
