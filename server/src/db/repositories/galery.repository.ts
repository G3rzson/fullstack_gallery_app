import GaleryImageModel, {
  GaleryImageSchemaType,
  GaleryImageLeanType,
} from "../models/galeryImage.model";
import GaleryTitleModel, {
  GaleryTitleSchemaType,
} from "../models/galeryTitle.model";
import type { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
import { BadRequestError } from "../../errors/BadRequestError";
import { MongoServerError } from "mongodb";

export async function createGaleryTitle(
  data: GaleryTitleSchemaType
): Promise<GaleryTitleSchemaType> {
  try {
    return await GaleryTitleModel.create(data);
  } catch (err: unknown) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new BadRequestError(
        `"${data.galeryTitle}" nevü galéria már létezik.`
      );
    }
    throw err;
  }
}

export async function getAllGaleryTitles(): Promise<GaleryTitleSchemaType[]> {
  return await GaleryTitleModel.find({ isPrivate: false })
    .sort({ galeryTitle: 1 })
    .lean();
}

export async function getMyGaleryTitles(
  username: string
): Promise<GaleryTitleSchemaType[]> {
  return await GaleryTitleModel.find({ createdBy: username })
    .sort({ galeryTitle: 1 })
    .lean();
}

export async function findGaleryTitleByUrl(url: string) {
  return await GaleryTitleModel.findOne({ url }).lean();
}

// find galery title by ID
export async function findGaleryTitleById(
  id: string
): Promise<HydratedDocument<GaleryTitleSchemaType> | null> {
  return await GaleryTitleModel.findById(id);
}

export async function deleteGaleryTitleById(
  id: string
): Promise<GaleryTitleSchemaType | null> {
  return await GaleryTitleModel.findByIdAndDelete(id);
}

export async function deleteGaleryImagesByUrl(url: string): Promise<{
  deletedCount?: number;
}> {
  return await GaleryImageModel.deleteMany({ galeryUrl: url });
}

export async function findGaleryImagesByUrl(
  url: string
): Promise<GaleryImageLeanType[]> {
  return await GaleryImageModel.find({ galeryUrl: url })
    .sort({ createdAt: -1 })
    .lean();
}

export async function findGaleryImageById(id: string) {
  return await GaleryImageModel.findById(id);
}

export async function deleteGaleryImageById(id: string) {
  return await GaleryImageModel.findByIdAndDelete(id);
}

export async function bulkWriteGaleryImages(
  bulkOps: {
    updateOne: {
      filter: {
        _id: Types.ObjectId | string;
      };
      update: {
        $set: {
          galeryUrl: string;
          url: string;
        };
      };
    };
  }[]
) {
  return GaleryImageModel.bulkWrite(bulkOps);
}

export async function createGaleryImage(
  saved: GaleryImageSchemaType[]
): Promise<GaleryImageSchemaType[]> {
  return await GaleryImageModel.insertMany(saved);
}
