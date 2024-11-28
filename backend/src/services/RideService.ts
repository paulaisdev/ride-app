import Driver from "../models/Driver";
import Ride, { Ride as RideInterface } from "../models/Ride";

export const getAvailableDrivers = async (distance: number) => {
    const drivers = await Driver.find({ minKm: { $lte: distance } });
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      valuePerKm: driver.ratePerKm,
    }));
  };

export const confirmRide = async (rideData: Omit<RideInterface, "_id" | "createdAt">) => {
  validateRideData(rideData);

  const driver = await Driver.findOne({ id: rideData.driver.id });
  if (!driver) {
    throw new Error("Driver not found.");
  }

  if (rideData.distance < driver.minKm) {
    throw new Error("Distance is below the minimum accepted by the driver.");
  }

  const ride = new Ride(rideData);
  return await ride.save();
};

const validateRideData = (data: Partial<RideInterface>) => {
  if (!data.customer_id || !data.origin || !data.destination) {
    throw new Error("Customer ID, origin, and destination are required.");
  }
  if (data.origin === data.destination) {
    throw new Error("Origin and destination cannot be the same.");
  }
};

export const getRideHistory = async (customerId: string, driverId?: number) => {
    if (!customerId) {
      throw new Error("Customer ID is required.");
    }
  
    const query: any = { customer_id: customerId };
    if (driverId) {
      query["driver.id"] = driverId;
    }
  
    const rides = await Ride.find(query).sort({ createdAt: -1 });
  
    if (!rides.length) {
      throw new Error("No rides found.");
    }
  
    return rides;
  };