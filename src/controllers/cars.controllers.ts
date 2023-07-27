import { ICarRequest } from "../interfaces/cars.interfaces";
import { listCarService } from "../services/cars/listAllCars.service";
import { Request, Response } from "express";
import { registerCarService } from "../services/cars/registerCar.service";

export const registerCarController = async (req: Request, res: Response) => {
  const carData: ICarRequest = req.body;
  const newCar = await registerCarService(carData);
  return res.status(201).json(newCar);
};

export const listCarsController = async (req: Request, res: Response) => {
  const allCars = await listCarService();
  return res.json(allCars);
};
