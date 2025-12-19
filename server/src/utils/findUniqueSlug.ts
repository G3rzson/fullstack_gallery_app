import GaleryTitleModel from "../db/models/galeryTitle.model";

export async function findUniqueSlug(
  baseSlug: string,
  excludeId?: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (
    await GaleryTitleModel.findOne({
      url: slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
