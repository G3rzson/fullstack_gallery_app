import { AppError } from "./AppError";

export class InternalServerError extends AppError {
  constructor(message = "Szerver hiba") {
    super(message, 500); // 500-as státusz
  }
}
