import {
  deleteGalleryImage,
  deleteGalleryTitle,
  getAllGalleryTitleByUsername,
  getGalleryImagesByGalleryId,
} from "../../db/dal/galery.repository";
import { deleteUserByUsername } from "../../db/dal/user.repository";
import cloudinary from "../../functions/cloudinary";
import { errorHandler } from "../../functions/errorHandler";

export async function deleteAccountService(username: string): Promise<void> {
  try {
    const galleryTitles = await getAllGalleryTitleByUsername(username);

    if (!galleryTitles) {
      throw new Error("Hiba történt a müvelet végrahajtása során.");
    }

    for (const galleryTitle of galleryTitles) {
      const galleryImages = await getGalleryImagesByGalleryId(
        galleryTitle._id.toString(),
      );

      for (const image of galleryImages) {
        await deleteGalleryImage(image._id.toString());
        if (image.publicId) {
          await cloudinary.uploader.destroy(image.publicId, {
            resource_type: "image",
          });
        }
      }

      await deleteGalleryTitle(galleryTitle._id.toString());
    }

    await deleteUserByUsername(username);
  } catch (error) {
    console.error("Fiók törlése közben hiba történt:", error);
    errorHandler(error);
  }
}
