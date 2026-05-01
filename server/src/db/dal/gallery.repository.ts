import { Types } from "mongoose";
import GalleryTitleModel, {
  GalleryTitleSchemaType,
  type GalleryTitleDocumentType,
} from "../models/galleryTitle.model";
import GalleryImageModel, {
  GalleryImageSchemaType,
  type GalleryImageDocumentType,
} from "../models/galleryImage.model";

export async function getFilteredPublicGalleries(
  search?: string,
): Promise<GalleryTitleDocumentType[]> {
  const filter: {
    isPublic: boolean;
    galleryTitle?: {
      $regex: string;
      $options: string;
    };
  } = {
    isPublic: true,
  };

  if (search) {
    filter.galleryTitle = {
      $regex: search,
      $options: "i",
    };
  }

  return await GalleryTitleModel.find(filter);
}

export async function getFilteredGalleryTitlesByUserId(
  userId: string,
  search?: string,
): Promise<GalleryTitleDocumentType[]> {
  const filter: {
    userId: string;
    galleryTitle?: {
      $regex: string;
      $options: string;
    };
  } = {
    userId: userId,
  };

  if (search) {
    filter.galleryTitle = {
      $regex: search,
      $options: "i",
    };
  }

  return await GalleryTitleModel.find(filter);
}

export async function getGalleryTitleById(
  galleryTitleId: string,
): Promise<GalleryTitleDocumentType | null> {
  return await GalleryTitleModel.findById(galleryTitleId);
}

export async function getAllGalleryTitleByUserId(
  username: string,
): Promise<GalleryTitleDocumentType[] | null> {
  return await GalleryTitleModel.find({ createdBy: username });
}

export async function getGalleryImagesByGalleryId(
  galleryTitleId: string,
): Promise<GalleryImageDocumentType[]> {
  return await GalleryImageModel.find({ galleryTitleId });
}

export async function changeGalleryTitleAccess(
  galleryTitleId: string,
  isPublic: boolean,
): Promise<GalleryTitleDocumentType | null> {
  return await GalleryTitleModel.findByIdAndUpdate(
    galleryTitleId,
    { isPublic },
    { returnDocument: "after" },
  );
}

export async function createGalleryTitle(
  data: GalleryTitleSchemaType,
): Promise<GalleryTitleDocumentType> {
  return await GalleryTitleModel.create(data);
}

export async function updateGalleryTitle(
  galleryTitleId: string,
  galleryTitle: string,
  isPublic: boolean,
): Promise<GalleryTitleDocumentType | null> {
  return await GalleryTitleModel.findByIdAndUpdate(
    galleryTitleId,
    { galleryTitle, isPublic },
    { returnDocument: "after" },
  );
}

export async function deleteGalleryTitle(
  galleryTitleId: string,
): Promise<void> {
  await GalleryTitleModel.findByIdAndDelete(galleryTitleId);
}

export async function saveGalleryImageToDb(
  data: GalleryImageSchemaType,
): Promise<GalleryImageDocumentType> {
  return await GalleryImageModel.create(data);
}

export async function getGalleryImages(
  galleryTitleId: string,
): Promise<GalleryImageDocumentType[]> {
  return await GalleryImageModel.find({ galleryTitleId });
}

export async function getGalleryImageById(
  imageId: string,
): Promise<GalleryImageDocumentType | null> {
  return await GalleryImageModel.findById(imageId);
}

export async function deleteGalleryImage(
  imageId: string | Types.ObjectId,
): Promise<void> {
  await GalleryImageModel.findByIdAndDelete(imageId);
}
