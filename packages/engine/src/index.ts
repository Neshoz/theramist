import app from "./app";
import { createMqttClient } from "@thermonitor/common";
import { Thermostat } from "./thermostat";

(() => {
  const client = createMqttClient();

  const livingRoom = new Thermostat({
    id: "f5b194a9-0ba5-4ea6-817b-8de87ee231e3",
    cycle: {
      interval: 2000,
      tempDecrease: 0.2,
      tempIncrease: 0.4,
    },
    targetTemp: 24,
    tolerance: {
      heat: 0.5,
      cold: 0.2,
    },
  }).start();

  const bedroom = new Thermostat({
    id: "97bd646f-c987-4939-9e2e-b2b10a78ad63",
    cycle: {
      interval: 10000,
      tempDecrease: 0.1,
      tempIncrease: 0.1,
    },
    targetTemp: 20,
    tolerance: {
      heat: 0.1,
      cold: 1,
    },
  }).start();

  livingRoom.on("temp", (temp: number) => {
    client.publish(
      "temp",
      JSON.stringify({
        id: livingRoom.id,
        state: livingRoom.state,
        temp,
      })
    );
  });

  bedroom.on("temp", (temp: number) => {
    client.publish(
      "temp",
      JSON.stringify({
        id: bedroom.id,
        state: bedroom.state,
        temp,
      })
    );
  });

  const port: number = Number.parseInt(process.env.PORT as string) || 8001;

  app().listen(port, "0.0.0.0", () => {
    console.log(`engine is running on port: ${port}`);
  });

  process.on("SIGINT", () => {
    client.end();
    process.exit(1);
  });
})();
