import "express";

declare global {
  namespace Express {
    interface Request {
      username?: string;
      _id?: string;
      userRole?: "USER" | "ADMIN";
    }
  }
}

export {};
