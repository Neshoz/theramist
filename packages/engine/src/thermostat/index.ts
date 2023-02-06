import EventEmitter from "events";
import crypto from "crypto";

interface Config {
  id?: string;
  targetTemp: number;
  cycle: {
    interval: number;
    tempIncrease: number;
    tempDecrease: number;
  };
  tolerance: {
    heat: number;
    cold: number;
  };
}

export class Thermostat extends EventEmitter {
  private currentTemp: number;
  private config: Config;
  public state: "on" | "off" = "on";
  public id: string;

  constructor(config: Config) {
    super();
    this.currentTemp = config.targetTemp;
    this.config = config;
    this.id = this.config.id ?? crypto.randomUUID();
  }

  start() {
    setInterval(() => this.processTemp(), this.config.cycle.interval);
    return this;
  }

  processTemp() {
    if (this.isTempAboveThreshold()) {
      this.state = "off";
      this.currentTemp -= this.config.cycle.tempDecrease;
    } else {
      this.state = "on";
      this.currentTemp += this.config.cycle.tempIncrease;
    }
    this.emit("temp", this.currentTemp);
  }

  private isTempAboveThreshold() {
    return (
      this.currentTemp + this.config.tolerance.heat > this.config.targetTemp
    );
  }
}
