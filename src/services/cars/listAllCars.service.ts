import {
  ICarResponse,
  IExternalCarResponse,
} from "../../interfaces/cars.interfaces";
import { carResponseSchema } from "../../schemas/cars.schemas";
import { AppError } from "../../errors";

const validateCar = async (
  car: IExternalCarResponse
): Promise<ICarResponse> => {
  try {
    const validatedCar: ICarResponse = await carResponseSchema.validate(car, {
      stripUnknown: true,
    });
    return validatedCar;
  } catch (error) {
    throw new AppError(`Invalid car data: ${error.message}`, 404);
  }
};

export const listCarService = async (): Promise<ICarResponse[]> => {
  try {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://api-test.bhut.com.br:3000/api/cars`,
      requestOptions
    );

    console.log(response.ok);

    if (!response.ok) {
      throw new AppError(`Failed to fetch data from the external API`, 400);
    }

    const data: IExternalCarResponse[] = await response.json();

    const validatedCars: ICarResponse[] = await Promise.all(
      data.map((car: IExternalCarResponse) => validateCar(car))
    );

    return validatedCars;
  } catch (error) {
    console.error("Error fetching data from the external API:", error);
    throw new AppError("Erro na request", 404);
  }
};
