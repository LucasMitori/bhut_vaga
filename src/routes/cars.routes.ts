import { Router } from "express";
import {
  listCarsController,
  registerCarController,
} from "../controllers/cars.controllers";

export const carsRoutes = Router();

carsRoutes.get("/listCars", listCarsController);
carsRoutes.post("/createCar", registerCarController);
