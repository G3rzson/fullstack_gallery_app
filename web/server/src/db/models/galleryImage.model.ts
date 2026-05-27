import { Schema, model, models, Document } from "mongoose";

export type GalleryImageSchemaType = {
  publicId: string;
  publicUrl: string;
  originalName: string;
  mimetype: string;
  size: number;
  galleryTitleId: string;
  userId: string;
  createdBy: string;
  createdAt?: Date;
};

export interface GalleryImageDocumentType
  extends GalleryImageSchemaType, Document {}

const galleryImageSchema = new Schema<GalleryImageDocumentType>({
  publicId: { type: String, required: true },
  publicUrl: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  galleryTitleId: { type: String, required: true },
  userId: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GalleryImageModel =
  models.GalleryImage ||
  model<GalleryImageDocumentType>("GalleryImage", galleryImageSchema);

export default GalleryImageModel;
