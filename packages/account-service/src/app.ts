import express from "express";
import session from "express-session";
import pgConnect from "connect-pg-simple";
import { db } from "@thermonitor/common";
import { router } from "./routes";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const PgSession = pgConnect(session);

export default () => {
  const app = express();

  // Needed since this service is being ran behind Nginx proxy.
  app.set("trust proxy", 1);
  app.use(express.json());

  app.use(
    session({
      secret: "some-very-secret-string",
      store: new PgSession({
        pool: db.pool,
        tableName: "session",
        schemaName: "account",
      }),
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 60 * 1000,
      },
    })
  );

  app.use("/auth", router);

  return app;
};
