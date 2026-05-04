import { NextFunction, Request, Response } from "express";
import { deleteAccountService } from "../../services/user/deleteAccount.services";
import { AppError } from "../../errors/AppError";

export async function deleteAccountController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userIdToDelete = req.params.userId as string;
    const loggedInUserId = req._id as string;
    const loggedInUserRole = req.userRole;

    const isDeletingOwnAccount = userIdToDelete === loggedInUserId;

    // Sima user csak a saját accountját törölheti
    if (!isDeletingOwnAccount && loggedInUserRole !== "ADMIN") {
      throw new AppError("Nincs jogosultságod ehhez a művelethez.", 403);
    }

    await deleteAccountService(userIdToDelete);

    if (isDeletingOwnAccount) {
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        expires: new Date(0),
        path: "/",
      });
    }

    res.json({
      success: true,
      message: "Fiók sikeresen törölve!",
    });
  } catch (err) {
    next(err);
  }
}
