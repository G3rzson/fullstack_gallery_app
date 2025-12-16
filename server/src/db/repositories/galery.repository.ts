import GaleryImageModel from "../models/galeryImage.model";
import GaleryTitleModel, {
  GaleryTitleSchemaType,
} from "../models/galeryTitle.model";
import { BadRequestError } from "../../errors/BadRequestError";
import { MongoServerError } from "mongodb";

// create galery title
export async function createGaleryTitle(data: GaleryTitleSchemaType) {
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

// get all galery titles
export async function getAllGaleryTitles() {
  return await GaleryTitleModel.find();
}

// find galery title by ID
export async function findGaleryTitleById(id: string) {
  return await GaleryTitleModel.findById(id);
}

// delete galery title by ID
export async function deleteGaleryTitleById(id: string) {
  return await GaleryTitleModel.findByIdAndDelete(id);
}

// delete galery images by galery URL
export async function deleteGaleryImagesByUrl(url: string) {
  return await GaleryImageModel.deleteMany({ galeryUrl: url });
}
