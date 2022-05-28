import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResults = validationResult(req);
  const hasErrors = !validationResults.isEmpty();

  if (hasErrors) {
    const errors = validationResults.array();

    return res.status(StatusCodes.BAD_REQUEST).send({ errors });
  }

  next();
};
