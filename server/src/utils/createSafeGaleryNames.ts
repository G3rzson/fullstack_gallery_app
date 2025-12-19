import sanitize from "sanitize-filename";
import slugify from "slugify";

export function createSafeGaleryNames(title: string) {
  const safeFolderName = sanitize(title);

  const safeUrl = slugify(safeFolderName, {
    lower: true,
    strict: true,
  });

  return { safeFolderName, safeUrl };
}
