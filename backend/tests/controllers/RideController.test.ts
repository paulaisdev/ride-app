import request from "supertest";
import app from "../../src/config/server";
import Driver from "../../src/models/Driver";

describe("RideController", () => {
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
    ]);
  });

  it("should return available drivers for a valid estimate request", async () => {
    const response = await request(app)
      .post("/ride/estimate")
      .send({
        customer_id: "12345",
        origin: "Av. Paulista, São Paulo",
        destination: "Rua Augusta, São Paulo",
      });

    expect(response.status).toBe(200);
    expect(response.body.options).toHaveLength(1);
    expect(response.body.options[0].name).toBe("Homer Simpson");
  });

  it("should return error for invalid estimate request", async () => {
    const response = await request(app).post("/ride/estimate").send({
      customer_id: "",
      origin: "",
      destination: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.error_code).toBe("INVALID_DATA");
  });
});
