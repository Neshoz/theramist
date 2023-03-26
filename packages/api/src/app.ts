import dotenv from "dotenv";
import express from "express";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import routes from "./routes";

dotenv.config();

export default () => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.use(errorHandlerMiddleware);

  return app;
};
