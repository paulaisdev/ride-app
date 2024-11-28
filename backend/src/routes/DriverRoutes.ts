import { Router } from "express";
import { getAllDrivers } from "../controllers/DriveController";

const router = Router();

router.get("/", getAllDrivers);

export default router;
