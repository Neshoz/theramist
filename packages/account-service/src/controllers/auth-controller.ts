import { NextFunction, Request, Response } from "express";
import { ApiError } from "@thermonitor/common";
import * as authService from "../services/auth-service";
import { InvalidCredentialsError } from "../services/errors";

export async function signInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = await authService.signInUser(email, password);
    const { password: _, ...rest } = user;

    req.session.userId = user.id;
    req.session.regenerate((err) => {
      console.debug(`Failed to regenerate session for user ${user.id}`);
    });

    res.json(rest);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return next(new ApiError(401, "Invalid credentials"));
    }
    return next(error);
  }
}

export async function signOutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {}
