import express from "express";
import routes from "./routes";

export default () => {
  const app = express();

  app.use(express.json());
  app.use("/api", routes);

  return app;
};
