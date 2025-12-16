import sanitize from "sanitize-filename";
import slugify from "slugify";

// Utility function to create safe folder names and URLs for gallery titles
export function createSafeGaleryNames(title: string) {
  // Sanitize the title to create a safe folder name
  const safeFolderName = sanitize(title);

  // Generate a URL-friendly slug from the safe folder name
  const safeUrl = slugify(safeFolderName, {
    lower: true,
    strict: true,
  });

  return { safeFolderName, safeUrl };
}
