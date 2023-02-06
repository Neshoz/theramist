import express from "express";
import * as thermostatController from "../controllers/thermostat-controller";

const router = express.Router();

router.route("/thermostats").get(thermostatController.getThermostats);
router.get("/thermostats/connect", thermostatController.connect);

export default router;
