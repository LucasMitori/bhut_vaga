import "express-async-errors";
import express from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.use(cors());

setupSwagger(app);

import { carsRoutes } from "./routes/cars.routes";
import { handleError } from "./errors";
import { handleWebhook } from "./controllers/webhook.controller";
import { handleGetLogs } from "./controllers/logs.controller";

app.use("/api", carsRoutes);
app.post("/webhook", handleWebhook);
app.get("/api/logs", handleGetLogs);

app.use(handleError);

export { app };
