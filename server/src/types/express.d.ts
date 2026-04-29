import "express-serve-static-core";
import { Schema } from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    username?: string;
    userId?: Schema.Types.ObjectId | string;
    userRole?: "USER" | "ADMIN";
  }
}

export {};
