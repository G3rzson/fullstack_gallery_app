import { Schema, model, models, Document } from "mongoose";

export type GalleryTitleSchemaType = {
  galleryTitle: string;
  isPublic: boolean;
  createdBy: string;
  userId: string;
  createdAt?: Date;
};

export interface GalleryTitleDocumentType
  extends GalleryTitleSchemaType, Document {}

const galleryTitleSchema = new Schema<GalleryTitleDocumentType>({
  galleryTitle: { type: String, required: true },
  isPublic: { type: Boolean, required: true, default: false },
  createdBy: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GalleryTitleModel =
  models.GalleryTitle ||
  model<GalleryTitleDocumentType>("GalleryTitle", galleryTitleSchema);

export default GalleryTitleModel;
