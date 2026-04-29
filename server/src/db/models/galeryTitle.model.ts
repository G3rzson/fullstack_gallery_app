import { Schema, model, models, Document } from "mongoose";

export type GaleryTitleSchemaType = {
  galeryTitle: string;
  isPublic: boolean;
  createdBy: string;
  userId: Schema.Types.ObjectId | string;
  createdAt?: Date;
};

export interface GaleryTitleDocumentType
  extends GaleryTitleSchemaType, Document {}

const galeryTitleSchema = new Schema<GaleryTitleDocumentType>({
  galeryTitle: { type: String, required: true },
  isPublic: { type: Boolean, required: true, default: false },
  createdBy: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const GaleryTitleModel =
  models.GaleryTitle ||
  model<GaleryTitleDocumentType>("GaleryTitle", galeryTitleSchema);

export default GaleryTitleModel;
