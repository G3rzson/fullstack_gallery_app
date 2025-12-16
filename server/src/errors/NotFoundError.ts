import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Erőforrás nem található") {
    super(message, 404);
  }
}
