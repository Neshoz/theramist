import { ApiError } from "@thermonitor/common";
import { NextFunction, Request, Response } from "express";

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
    return res.status(error.status).json({
      message: error.message,
    });
  }

  console.log(`${error.message} ${error.stack}`);
  return res.status(500).json({ message: "Internal server error" });
}
