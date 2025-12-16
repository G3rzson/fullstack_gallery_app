import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";

// Middleware to validate request data using a Zod schema
export function validateDataMW(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body against the provided schema
    const validatedData = schema.safeParse(req.body);

    // If validation fails, pass a BadRequestError to the next error handling middleware
    if (!validatedData.success) {
      return next(
        new BadRequestError(
          validatedData.error.issues.map((issue) => issue.message).join(", ")
        )
      );
    }
    // If validation succeeds, attach the validated data to req.body and proceed to the next middleware/controller
    req.body = validatedData.data;
    next();
  };
}
