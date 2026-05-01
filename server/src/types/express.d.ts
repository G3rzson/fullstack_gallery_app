import "express";

declare global {
  namespace Express {
    interface Request {
      username?: string;
      userId?: string;
      userRole?: "USER" | "ADMIN";
    }
  }
}

export {};
