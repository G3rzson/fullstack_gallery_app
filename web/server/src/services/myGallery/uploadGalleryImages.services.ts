import cloudinary from "../../functions/cloudinary";
import { saveGalleryImageToDb } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function uploadGalleryImagesService({
  files,
  galleryTitleId,
  createdBy,
  userId,
}: {
  files: Express.Multer.File[];
  galleryTitleId: string;
  createdBy: string;
  userId: string;
}) {
  try {
    const savedImages = [];
    for (const file of files) {
      // Feltöltés Cloudinary-be
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "gallery_images",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(file.buffer);
      });

      try {
        const newImageData = {
          publicId: uploadResult.public_id,
          publicUrl: uploadResult.secure_url,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          galleryTitleId: galleryTitleId,
          createdBy,
          userId,
        };

        const img = await saveGalleryImageToDb(newImageData);
        savedImages.push(img);
      } catch (dbErr) {
        // Backup: törlés Cloudinary-ből, ha a DB mentés nem sikerül
        await cloudinary.uploader.destroy(uploadResult.public_id, {
          resource_type: "image",
        });
        throw dbErr;
      }
    }
    return savedImages;
  } catch (error) {
    errorHandler(error);
  }
}
