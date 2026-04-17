import GaleryTitleModel, {
  type GaleryTitleSchemaType,
} from "../models/galeryTitle.model";

export async function createGaleryTitle(data: GaleryTitleSchemaType) {
  return await GaleryTitleModel.create(data);
}

export async function getGaleriesByUsername(username: string) {
  return await GaleryTitleModel.find({ createdBy: username });
}

export async function getPublicGaleries() {
  return await GaleryTitleModel.find({ isPublic: true });
}
