import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICarRequest } from "../interfaces/cars.interfaces";

const carRequestSchema: SchemaOf<ICarRequest> = yup.object().shape({
  title: yup.string().required(),
  brand: yup.string().required(),
  price: yup.string().required(),
  age: yup.number().required(),
  __v: yup.number().required(),
});
const carResponseSchema: SchemaOf<ICarRequest> = yup.object().shape({
  id: yup.string(),
  title: yup.string().required(),
  brand: yup.string().required(),
  price: yup.string().required(),
  age: yup.number().required(),
  __v: yup.number().required(),
});

export { carRequestSchema, carResponseSchema };
