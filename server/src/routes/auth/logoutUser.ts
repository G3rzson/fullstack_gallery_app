import { Request, Response } from "express";

export async function logoutUser(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "User already logged out!" });
    }

    return res
      .cookie("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "User logged out successfully!",
        data: { user: null, accessToken: null },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
