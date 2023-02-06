import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  code: number;

  constructor(code: number, message?: string) {
    super();
    this.code = code;
    this.message = message || "Internal server error";
  }
}

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ApiError) {
    return res.status(error.code).json({
      message: error.message,
    });
  }

  console.log(`${error.message} ${error.stack}`);
  return res.status(500).json({ message: "Internal server error" });
}
