import { Request, Response } from "express";
import { getAvailableDrivers, confirmRide, getRideHistory } from "../services/RideService";
import { calculateRoute } from "../utils/googleApi";

export const estimateRideHandler = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;

  try {
    if (!customer_id || !origin || !destination) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Customer ID, origin, and destination are required.",
      });
    }

    if (origin === destination) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Origin and destination cannot be the same.",
      });
    }

    const { distance, duration, routeResponse } = await calculateRoute(origin, destination);
    const drivers = await getAvailableDrivers(distance);

    const availableDrivers = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      value: driver.valuePerKm * distance,
    }));

    return res.status(200).json({
      origin,
      destination,
      distance,
      duration,
      options: availableDrivers,
      routeResponse,
    });
  } catch (error: any) {
    return res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: error.message,
    });
  }
};

export const confirmRideHandler = async (req: Request, res: Response) => {
  try {
    const rideData = req.body;

    const ride = await confirmRide(rideData);

    return res.status(200).json({ success: true, ride });
  } catch (error: any) {
    const errorDescription = error.message;
    if (errorDescription === "Driver not found.") {
      return res.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: errorDescription,
      });
    } else if (errorDescription === "Distance is below the minimum accepted by the driver.") {
      return res.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: errorDescription,
      });
    } else {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: errorDescription,
      });
    }
  }
};

export const getRideHistoryHandler = async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    const rides = await getRideHistory(customer_id, driver_id ? Number(driver_id) : undefined);

    return res.status(200).json({ customer_id, rides });
  } catch (error: any) {
    const errorDescription = error.message;
    if (errorDescription === "No rides found.") {
      return res.status(404).json({
        error_code: "NO_RIDES_FOUND",
        error_description: errorDescription,
      });
    } else {
      return res.status(400).json({
        error_code: "INVALID_DRIVER",
        error_description: errorDescription,
      });
    }
  }
};
