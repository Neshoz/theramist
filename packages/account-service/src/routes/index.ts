import express from "express";
import * as authController from "../controllers/auth-controller";

const router = express.Router();

router.post("/signin", authController.signInUser);
router.post("/signout", authController.signOutUser);

export { router };
