import SQL from "sql-template-strings";
import bcrypt from "bcrypt";
import type { Session, SessionData } from "express-session";
import { db } from "@thermonitor/common";
import { InvalidCredentialsError } from "./errors";
import { UserDao } from "../types";

export async function signInUser(
  email: string,
  password: string
): Promise<UserDao> {
  const result = await db.query<UserDao>(
    SQL`SELECT * FROM account.user WHERE email = ${email}`
  );

  if (result.rowCount === 0) {
    console.debug(`A user with email ${email} does not exist`);
    throw new InvalidCredentialsError();
  }

  const user = result.rows[0];

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    console.debug("Password does not match");
    throw new InvalidCredentialsError();
  }

  return user;
}
