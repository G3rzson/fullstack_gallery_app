import GaleryImageModel from "../db/models/galeryImage.model";

export async function updateGaleryImages(
  oldSlug: string,
  newSlug: string,
  oldRelativeDir: string,
  newRelativeDir: string
) {
  const images = await GaleryImageModel.find({ galeryUrl: oldSlug });

  if (!images.length) return;

  const oldPrefix = `/uploads/${oldRelativeDir}/`;
  const newPrefix = `/uploads/${newRelativeDir}/`;

  const bulkOps = images.map((img) => {
    const newUrl = img.url.startsWith(oldPrefix)
      ? img.url.replace(oldPrefix, newPrefix)
      : img.url;

    return {
      updateOne: {
        filter: { _id: img._id },
        update: { $set: { galeryUrl: newSlug, url: newUrl } },
      },
    };
  });

  await GaleryImageModel.bulkWrite(bulkOps);
}
