import { Schema, model, models, Document } from "mongoose";

export type GaleryImageSchemaType = {
  publicId: string;
  publicUrl: string;
  originalName: string;
  mimetype: string;
  size: number;
  galleryId: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
  createdBy: string;
  createdAt?: Date;
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
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GaleryImageModel =
  models.GaleryImage ||
  model<GaleryImageDocumentType>("GaleryImage", galeryImageSchema);

export default GaleryImageModel;
