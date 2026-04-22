import cloudinary from "../../functions/cloudinary";
import { saveGalleryImageToDb } from "../../db/dal/galery.repository";

export async function uploadGalleryImagesService({
  files,
  galleryId,
  createdBy,
}: {
  files: Express.Multer.File[];
  galleryId: string;
  createdBy: string;
}) {
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

    // Mentés adatbázisba repository-n keresztül
    try {
      const img = await saveGalleryImageToDb({
        publicId: uploadResult.public_id,
        publicUrl: uploadResult.secure_url,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        galleryId,
        createdBy,
      });
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
}
