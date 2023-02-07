import dotenv from "dotenv";
import { createMqttClient } from "@thermonitor/common";
import app from "./app";

(() => {
  console.log("db", process.env.PGDATABASE);
  const client = createMqttClient();
  client.subscribe("temp");

  client.on("message", (topic, message) => {
    console.log(`message: ${message}, topic: ${topic}`);
  });

  const port: number = Number.parseInt(process.env.PORT as string) || 8000;

  app().listen(port, "0.0.0.0", () => {
    console.log(`api is running on port: ${port}`);
  });

  process.on("SIGINT", () => {
    client.end();
    process.exit(1);
  });
})();
