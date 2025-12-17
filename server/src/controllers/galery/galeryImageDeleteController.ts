import { Request, Response, NextFunction } from "express";
import { deleteGaleryImageService } from "../../services/galery/deleteGaleryImageService";

export async function galeryImageDeleteController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await deleteGaleryImageService(id);

    res.json({
      success: true,
      message: "A kép sikeresen törölve lett!",
    });
  } catch (error) {
    next(error);
  }
}
