import { NextFunction, Request, Response } from "express";
import { deleteAccountService } from "../../services/user/deleteAccount.services";

export async function deleteAccountController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userIdToDelete = req.params.userId as string;
    const loggedInUserId = req._id as string;

    await deleteAccountService(userIdToDelete);

    // Csak akkor töröljük a cookie-t, ha a bejelentkezett user a saját accountját törli
    const isDeletingOwnAccount = userIdToDelete === loggedInUserId;

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
