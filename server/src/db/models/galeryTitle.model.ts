import { Schema, model, models, Document } from "mongoose";

export type GaleryTitleSchemaType = {
  galeryTitle: string;
  createdBy: string;
  isPublic: boolean;
};

export interface GaleryTitleDocumentType
  extends GaleryTitleSchemaType, Document {}

const galeryTitleSchema = new Schema<GaleryTitleDocumentType>({
  galeryTitle: { type: String, required: true },
  createdBy: { type: String, required: true },
  isPublic: { type: Boolean, required: true, default: false },
});

const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleDocumentType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
