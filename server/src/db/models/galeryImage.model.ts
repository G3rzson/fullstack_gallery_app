import { Schema, model, models, Document, Types } from "mongoose";

export type GaleryImageSchemaType = {
  publicId: string;
  publicUrl: string;
  originalName: string;
  mimetype: string;
  size: number;
  galleryId: Types.ObjectId;
  createdBy: string;
};

export interface GaleryImageDocumentType
  extends GaleryImageSchemaType, Document {}

const galeryImageSchema = new Schema<GaleryImageDocumentType>({
  publicId: { type: String, required: true },
  publicUrl: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  galleryId: { type: Schema.Types.ObjectId, ref: "Gallery", required: true },
  createdBy: { type: String, required: true },
});

const GaleryImageModel =
  models.GaleryImage ||
  model<GaleryImageDocumentType>("GaleryImage", galeryImageSchema);

export default GaleryImageModel;
