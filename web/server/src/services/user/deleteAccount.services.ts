import {
  deleteGalleryImage,
  deleteGalleryTitle,
  getAllGalleryTitleByUserId,
  getGalleryImagesByGalleryId,
} from "../../db/dal/gallery.repository";
import { deleteUserById } from "../../db/dal/user.repository";
import cloudinary from "../../functions/cloudinary";
import { errorHandler } from "../../functions/errorHandler";

export async function deleteAccountService(userId: string): Promise<void> {
  try {
    const galleryTitles = await getAllGalleryTitleByUserId(userId);

    if (!galleryTitles || galleryTitles.length === 0) {
      // Ha nincs galéria, csak töröljük a felhasználót
      await deleteUserById(userId);
      return;
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

    await deleteUserById(userId);
  } catch (error) {
    console.error("Fiók törlése közben hiba történt:", error);
    errorHandler(error);
  }
}
