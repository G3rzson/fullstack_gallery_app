import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message = "Hibás kérés!") {
    super(message, 400);
  }
}
