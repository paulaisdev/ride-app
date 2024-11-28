import { Request, Response } from "express";
import { generateDriversList } from "../services/DriverService";

export const getAllDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const drivers = await generateDriversList();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Failed to fetch drivers list.",
    });
  }
};
