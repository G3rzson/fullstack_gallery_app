import GaleryImageModel from "../db/models/galeryImage.model";

export async function updateGaleryImages(
  oldSlug: string,
  newSlug: string,
  newFolderName: string
) {
  const images = await GaleryImageModel.find({ galeryUrl: oldSlug });

  if (!images.length) return;

  const bulkOps = images.map((img) => {
    const newUrl = img.url.replace(
      /\/uploads\/[^/]+\//,
      `/uploads/${newFolderName}/`
    );

    return {
      updateOne: {
        filter: { _id: img._id },
        update: { $set: { galeryUrl: newSlug, url: newUrl } },
      },
    };
  });

  await GaleryImageModel.bulkWrite(bulkOps);
}
