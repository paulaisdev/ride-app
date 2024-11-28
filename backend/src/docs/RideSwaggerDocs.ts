const rideSwaggerDocs = {
    "/ride/estimate": {
      post: {
        summary: "Estimate ride costs",
        description: "Calculates the ride costs based on origin and destination.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  customer_id: { type: "string", example: "12345" },
                  origin: { type: "string", example: "Av. Paulista, 1578, São Paulo, SP" },
                  destination: { type: "string", example: "Rua Augusta, 1508, São Paulo, SP" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful response with ride options",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    origin: {
                      type: "object",
                      properties: { latitude: { type: "number" }, longitude: { type: "number" } },
                    },
                    destination: {
                      type: "object",
                      properties: { latitude: { type: "number" }, longitude: { type: "number" } },
                    },
                    distance: { type: "number" },
                    duration: { type: "string" },
                    options: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          vehicle: { type: "string" },
                          review: {
                            type: "object",
                            properties: {
                              rating: { type: "number" },
                              comment: { type: "string" },
                            },
                          },
                          value: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Invalid data" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/ride/confirm": {
      patch: {
        summary: "Confirm a ride",
        description: "Saves the ride details into the history.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  customer_id: { type: "string", example: "12345" },
                  origin: { type: "string", example: "Av. Paulista, 1578, São Paulo, SP" },
                  destination: { type: "string", example: "Rua Augusta, 1508, São Paulo, SP" },
                  distance: { type: "number", example: 12.5 },
                  duration: { type: "string", example: "25 mins" },
                  driver: {
                    type: "object",
                    properties: { id: { type: "number", example: 1 }, name: { type: "string", example: "Homer Simpson" } },
                  },
                  value: { type: "number", example: 35.0 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Ride confirmed successfully" },
          400: { description: "Invalid data" },
          404: { description: "Driver not found" },
          406: { description: "Invalid distance for the driver" },
        },
      },
    },
    "/ride/{customer_id}": {
      get: {
        summary: "Get ride history",
        description: "Fetches the ride history of a customer, optionally filtered by driver ID.",
        parameters: [
          {
            in: "path",
            name: "customer_id",
            required: true,
            schema: { type: "string" },
            description: "Customer ID",
          },
          {
            in: "query",
            name: "driver_id",
            required: false,
            schema: { type: "number" },
            description: "Filter by driver ID",
          },
        ],
        responses: {
          200: {
            description: "Successful response with ride history",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    customer_id: { type: "string" },
                    rides: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          date: { type: "string", format: "date-time" },
                          origin: { type: "string" },
                          destination: { type: "string" },
                          distance: { type: "number" },
                          duration: { type: "string" },
                          driver: {
                            type: "object",
                            properties: { id: { type: "number" }, name: { type: "string" } },
                          },
                          value: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "No rides found" },
        },
      },
    },
  };
  
  export default rideSwaggerDocs;
  