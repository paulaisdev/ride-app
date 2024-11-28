import DriverModel from "../models/Driver";

export const generateDriversList = async () => {
  try {
    return await DriverModel.find();
  } catch (error) {
    console.error("Error generating drivers list:", error);
    throw new Error("Failed to generate drivers list.");
  }
};
