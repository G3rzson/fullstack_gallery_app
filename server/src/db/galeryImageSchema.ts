import { Schema, model, models } from "mongoose";

type GaleryImageType = {
  filename: string;
  url: string;
  galeryUrl: string;
  createdAt?: Date;
};

const galeryImageSchema = new Schema<GaleryImageType>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  galeryUrl: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const GaleryImageModel =
  models.GaleryImage ||
  model<GaleryImageType>("GaleryImage", galeryImageSchema);

export default GaleryImageModel;
