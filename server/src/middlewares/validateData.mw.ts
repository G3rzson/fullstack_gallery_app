import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";

export function validateDataMW<T extends ZodSchema>(schema: T) {
  return (
    req: Request<{}, {}, z.infer<T>>,
    res: Response,
    next: NextFunction
  ) => {
    const validatedData = schema.safeParse(req.body);

    if (!validatedData.success) {
      return next(
        new BadRequestError(
          validatedData.error.issues.map((issue) => issue.message).join(", ")
        )
      );
    }

    req.body = validatedData.data;
    next();
  };
}
