import {
  bulkWriteGaleryImages,
  findGaleryImagesByUrl,
} from "../db/repositories/galery.repository";

export async function updateGaleryImages(
  oldSlug: string,
  newSlug: string,
  oldRelativeDir: string,
  newRelativeDir: string
) {
  const imagesArray = await findGaleryImagesByUrl(oldSlug);

  if (!imagesArray.length) return;

  const oldPrefix = `/uploads/${oldRelativeDir}/`;
  const newPrefix = `/uploads/${newRelativeDir}/`;

  const bulkOps = imagesArray.map((img) => {
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

  await bulkWriteGaleryImages(bulkOps);
}
