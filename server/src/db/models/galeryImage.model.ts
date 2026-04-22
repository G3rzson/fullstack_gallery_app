import { Schema, model, models } from "mongoose";

export type GaleryImageSchemaType = {
  publicId: string;
  publicUrl: string;
  originalName: string;
  mimetype: string;
  size: number;
  galleryId: Schema.Types.ObjectId;
  createdBy: string;
};

const galeryImageSchema = new Schema<GaleryImageSchemaType>({
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
  model<GaleryImageSchemaType>("GaleryImage", galeryImageSchema);

export default GaleryImageModel;
