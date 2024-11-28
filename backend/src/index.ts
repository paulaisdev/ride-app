import express from 'express';
import app from "./config/server";
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

import rideRoutes from "./routes/RideRoutes"
import driverRoutes from "./routes/DriverRoutes"
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:80" }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/ride", rideRoutes);
app.use("/drivers", driverRoutes);