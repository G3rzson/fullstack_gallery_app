import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { getUserByUserIdService } from "../../services/admin/getUserByUserIdService";

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.id as string;

    console.log("getUserByIdController - userId:", userId);
    if (!userId) {
      throw new UnauthorizedError("User ID is required.");
    }

    const user = await getUserByUserIdService(userId);

    console.log("getUserByIdController - user:", user);
    res.status(200).json({
      success: true,
      message: "Felhasználó lekérve",
      data: user,
    });
  } catch (err) {
    console.error("Error in getUserByIdController:", err);
    next(err);
  }
}
