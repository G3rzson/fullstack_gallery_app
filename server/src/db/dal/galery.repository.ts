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

export async function changeGalleryTitleAccess(
  galleryId: string,
  isPublic: boolean,
) {
  return await GaleryTitleModel.findByIdAndUpdate(
    galleryId,
    { isPublic },
    { returnDocument: "after" },
  );
}

export async function getGalleryById(galleryId: string) {
  return await GaleryTitleModel.findById(galleryId);
}

export async function deleteGalleryTitle(galleryId: string) {
  return await GaleryTitleModel.findByIdAndDelete(galleryId);
}

export async function updateGalleryTitle(
  galleryId: string,
  galeryTitle: string,
  isPublic: boolean,
) {
  return await GaleryTitleModel.findByIdAndUpdate(
    galleryId,
    { galeryTitle, isPublic },
    { returnDocument: "after" },
  );
}
