import { NextFunction, Request, Response } from "express";

import * as thermostatService from "../services/thermostat-service";

export async function getThermostats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const thermostats = await thermostatService.getThermostats();
    res.json(thermostats);
  } catch (error) {
    next(error);
  }
}

export async function addThermostat(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;
    const createdThermostat = await thermostatService.addThermostat(name);
    res.json(createdThermostat);
  } catch (error) {
    next(error);
  }
}

export async function connect(req: Request, res: Response) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
}
