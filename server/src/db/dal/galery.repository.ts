import GaleryTitleModel, {
  type GaleryTitleSchemaType,
} from "../models/galeryTitle.model";
import GaleryImageModel from "../models/galeryImage.model";

export async function getGalleryImagesByGalleryId(galleryId: string) {
  return await GaleryImageModel.find({ galleryId });
}

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

// --- Gallery Image mentés ---
export async function saveGalleryImageToDb({
  publicId,
  publicUrl,
  originalName,
  mimetype,
  size,
  galleryId,
  createdBy,
}: {
  publicId: string;
  publicUrl: string;
  originalName: string;
  mimetype: string;
  size: number;
  galleryId: string;
  createdBy: string;
}) {
  return await GaleryImageModel.create({
    publicId,
    publicUrl,
    originalName,
    mimetype,
    size,
    galleryId,
    createdBy,
  });
}

export async function getGalleryImages(createdBy: string, galleryId: string) {
  return await GaleryImageModel.find({ createdBy, galleryId });
}

export async function getGalleryImageById(imageId: string) {
  return await GaleryImageModel.findById(imageId);
}

export async function deleteGalleryImage(imageId: string) {
  return await GaleryImageModel.findByIdAndDelete(imageId);
}
