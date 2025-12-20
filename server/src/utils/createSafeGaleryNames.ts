import sanitize from "sanitize-filename";
import slugify from "slugify";

export function createSafeGaleryNames(title: string, username: string) {
  const safeUserFolder = sanitize(username);
  const safeGaleryTitleFolder = sanitize(title);

  const safeUrl = slugify(safeGaleryTitleFolder, {
    lower: true,
    strict: true,
  });

  return { safeGaleryTitleFolder, safeUrl, safeUserFolder };
}
