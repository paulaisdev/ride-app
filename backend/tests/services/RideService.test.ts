import { confirmRide, getAvailableDrivers, getRideHistory } from "../../src/services/RideService";
import Driver from "../../src/models/Driver";

describe("RideService", () => {
  beforeEach(async () => {
    await Driver.create([
      {
        id: 1,
        name: "Homer Simpson",
        description: "Olá! Sou o Homer, seu motorista camarada!",
        vehicle: "Plymouth Valiant 1973",
        review: { rating: 2, comment: "Motorista simpático, mas cheira a donuts." },
        ratePerKm: 2.5,
        minKm: 1,
      },
      {
        id: 2,
        name: "James Bond",
        description: "Boa noite, sou James Bond.",
        vehicle: "Aston Martin DB5",
        review: { rating: 5, comment: "Serviço impecável e magnífico." },
        ratePerKm: 10,
        minKm: 10,
      },
    ]);
  });

  it("should return available drivers for a given distance", async () => {
    const drivers = await getAvailableDrivers(5);
    expect(drivers).toHaveLength(1);
    expect(drivers[0].name).toBe("Homer Simpson");
  });

  it("should throw an error if trying to confirm a ride with an invalid driver", async () => {
    const invalidRideData = {
      customer_id: "12345",
      origin: "A",
      destination: "B",
      distance: 5,
      duration: "10 mins",
      driver: { id: 999, name: "Invalid Driver" },
      value: 50,
    };

    await expect(confirmRide(invalidRideData)).rejects.toThrow("Driver not found.");
  });

  it("should save a ride successfully", async () => {
    const rideData = {
      customer_id: "12345",
      origin: "A",
      destination: "B",
      distance: 5,
      duration: "10 mins",
      driver: { id: 1, name: "Homer Simpson" },
      value: 50,
    };

    const ride = await confirmRide(rideData);
    expect(ride.customer_id).toBe("12345");
    expect(ride.driver.name).toBe("Homer Simpson");
  });
});
