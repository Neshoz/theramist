import SQL from "sql-template-strings";
import { db } from "@thermonitor/common";
import {
  Thermostat,
  ThermostatBase,
  ThermostatStatus,
} from "../types/thermostat";

export async function getThermostats(): Promise<Thermostat[]> {
  const result = await db.query<Thermostat>(
    SQL`SELECT * FROM device.thermostat`
  );

  return result.rows;
}

export async function addThermostat(
  thermostat: ThermostatBase
): Promise<Thermostat> {
  const { id, name, status, temp } = thermostat;
  const result = await db.query<Thermostat>(
    SQL`
      INSERT INTO device.thermostat (id, name, status, temp)
      VALUES (
        ${id},
        ${name},
        ${status}
        ${temp}
      )
      RETURNING *
    `
  );

  return result.rows[0];
}

export async function getThermostat(
  id: string
): Promise<Thermostat | undefined> {
  const result = await db.query<Thermostat>(
    SQL`SELECT * FROM device.thermostat WHERE id = ${id}`
  );

  return result.rows[0];
}

export async function updateThermostat(
  id: string,
  status: ThermostatStatus,
  temp: number
): Promise<number> {
  await db.query(
    SQL`UPDATE
        device.thermostat
      SET
        status = ${status},
        temp = ${temp}
      WHERE
        id = ${id}
    `
  );

  return 1;
}
