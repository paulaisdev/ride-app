import { Router } from "express";
import { estimateRideHandler, confirmRideHandler, getRideHistoryHandler } from "../controllers/RideController";

const router = Router();

router.post("/estimate", estimateRideHandler);
router.patch("/confirm", confirmRideHandler);
router.get("/:customer_id", getRideHistoryHandler);

export default router;
