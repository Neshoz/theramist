export type ThermostatStatus = "on" | "off" | "verify";

export interface ThermostatBase {
  id: string;
  name: string;
  temp: number;
  status: ThermostatStatus;
}

export interface Thermostat extends ThermostatBase {
  modified: string;
}
