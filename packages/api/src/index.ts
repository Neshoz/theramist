import dotenv from "dotenv";
import { createMqttClient } from "@thermonitor/common";
import app from "./app";

(() => {
  dotenv.config();
  const client = createMqttClient();
  client.subscribe("temp");

  client.on("message", (topic, message) => {
    console.log(`message: ${message}, topic: ${topic}`);
  });

  const port: number = Number.parseInt(process.env.PORT as string) || 8000;

  app().listen(port, () => {
    console.log(`api is running on port: ${port}`);
  });

  process.on("SIGINT", () => {
    client.end();
    process.exit();
  });
})();
