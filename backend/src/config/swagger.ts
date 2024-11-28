import swaggerJsDoc from "swagger-jsdoc";
import rideSwaggerDocs from "../docs/RideSwaggerDocs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ride Request API",
      version: "1.0.0",
      description: "API for managing ride requests and history",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
    ],
      paths: rideSwaggerDocs,
    },
    apis: [],
};

export default swaggerJsDoc(swaggerOptions);