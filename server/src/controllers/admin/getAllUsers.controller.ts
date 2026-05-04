import type { NextFunction, Request, Response } from "express";
import { getAllUsersService } from "../../services/admin/getAllUsers.services";

export async function getAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const search = req.query.search as string | undefined;

    const users = await getAllUsersService(search);

    res.status(200).json({
      success: true,
      message: "Felhasználók lekérve",
      data: users,
    });
  } catch (err) {
    next(err);
  }
}
