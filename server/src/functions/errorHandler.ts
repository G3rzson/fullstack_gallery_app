import { Error as MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";
import { BadRequestError } from "../errors/BadRequestError";
import { InternalServerError } from "../errors/InternalServerError";

export function errorHandler(error: unknown): never {
  // Mongoose duplikált kulcs (pl. unique violation)
  if (error instanceof MongoServerError && error.code === 11000) {
    throw new BadRequestError("Ez a felhasználónév vagy email már foglalt.");
  }
  // Egyéb Mongoose hiba
  if (error instanceof MongooseError) {
    throw new InternalServerError("Adatbázis hiba.");
  }
  // Egyéb ismert error
  if (error instanceof BadRequestError) {
    throw error;
  }
  // Ha az error egy sima Error objektum, dobjuk tovább, hogy a global error handler el tudja kapni
  if (error instanceof Error) {
    throw error;
  }
  // Alapértelmezett
  throw new InternalServerError("Ismeretlen hiba.");
}
