import mqtt from "mqtt";
import crypto from "crypto";

const url = "mqtt://test.mosquitto.org";

export function createMqttClient(clientId?: string) {
  const cId = `thermonitor__${clientId ?? crypto.randomUUID()}`;
  const client = mqtt.connect(url, { clientId: cId });

  client.on("connect", () => {
    console.log("client: %s connected to broker", cId);
  });

  return client;
}
