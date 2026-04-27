import GaleryTitleModel, {
  type GaleryTitleSchemaType,
  type GaleryTitleDocumentType,
} from "../models/galeryTitle.model";
import GaleryImageModel, {
  GaleryImageSchemaType,
  type GaleryImageDocumentType,
} from "../models/galeryImage.model";
import { Types } from "mongoose";

export async function getPublicGaleries(
  filter: Record<string, any>,
): Promise<GaleryTitleDocumentType[]> {
  return await GaleryTitleModel.find(filter);
}

export async function getGalleryById(
  galleryId: string,
): Promise<GaleryTitleDocumentType | null> {
  return await GaleryTitleModel.findById(galleryId);
}

export async function getGalleryByUsername(
  username: string,
): Promise<GaleryTitleDocumentType | null> {
  return await GaleryTitleModel.findOne({ createdBy: username });
}

export async function getAllGalleryTitleByUsername(
  username: string,
): Promise<GaleryTitleDocumentType[] | null> {
  return await GaleryTitleModel.find({ createdBy: username });
}

export async function getGalleryImagesByGalleryId(
  galleryId: string,
): Promise<GaleryImageDocumentType[]> {
  return await GaleryImageModel.find({ galleryId });
}

export async function getFilteredGalleryTitles(
  filter: Record<string, any>,
): Promise<GaleryTitleDocumentType[]> {
  return await GaleryTitleModel.find(filter);
}

export async function changeGalleryTitleAccess(
  galleryId: string,
  isPublic: boolean,
): Promise<GaleryTitleDocumentType | null> {
  return await GaleryTitleModel.findByIdAndUpdate(
    galleryId,
    { isPublic },
    { returnDocument: "after" },
  );
}

export async function createGaleryTitle(
  data: GaleryTitleSchemaType,
): Promise<GaleryTitleDocumentType> {
  return await GaleryTitleModel.create(data);
}

export async function updateGalleryTitle(
  galleryId: string,
  galeryTitle: string,
  isPublic: boolean,
): Promise<GaleryTitleDocumentType | null> {
  return await GaleryTitleModel.findByIdAndUpdate(
    galleryId,
    { galeryTitle, isPublic },
    { returnDocument: "after" },
  );
}

export async function deleteGalleryTitle(galleryId: string): Promise<void> {
  await GaleryTitleModel.findByIdAndDelete(galleryId);
}

export async function saveGalleryImageToDb(
  data: GaleryImageSchemaType,
): Promise<GaleryImageDocumentType> {
  return await GaleryImageModel.create(data);
}

export async function getGalleryImages(
  createdBy: string,
  galleryId: string,
): Promise<GaleryImageDocumentType[]> {
  return await GaleryImageModel.find({ createdBy, galleryId });
}

export async function getGalleryImageById(
  imageId: string,
): Promise<GaleryImageDocumentType | null> {
  return await GaleryImageModel.findById(imageId);
}

export async function deleteGalleryImage(
  imageId: string | Types.ObjectId,
): Promise<void> {
  await GaleryImageModel.findByIdAndDelete(imageId);
}
