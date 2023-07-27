import {
  ICarRequest,
  ICarResponse,
  IExternalCarResponse,
} from "../../interfaces/cars.interfaces";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
require("dotenv").config();

const MONGODB_URI = "mongodb://127.0.0.1:27017/bhut_db";

const logSchema = new mongoose.Schema({
  id: String,
  data_hora: Date,
  car_id: String,
});

const Log = mongoose.model("Log", logSchema);

export const registerCarService = async (
  carData: ICarRequest
): Promise<ICarResponse> => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    };

    const response = await fetch(
      `http://api-test.bhut.com.br:3000/api/cars`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to register car in the external API`);
    }

    const externalCarResponse: IExternalCarResponse = await response.json();

    const logData = {
      id: externalCarResponse._id,
      data_hora: new Date(),
      car_id: externalCarResponse._id,
    };

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Log.create(logData);

    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "lucas.mitori@email.com",
      subject: "Novo Carro Cadastrado",
      text: `Um novo carro foi cadastrado com as seguintes informações:\n${JSON.stringify(
        externalCarResponse
      )}`,
    };

    await transporter.sendMail(mailOptions);

    const registeredCar: ICarResponse = {
      id: externalCarResponse._id,
      title: externalCarResponse.title,
      brand: externalCarResponse.brand,
      price: externalCarResponse.price,
      age: externalCarResponse.age,
      __v: externalCarResponse.__v,
    };

    return registeredCar;
  } catch (error) {
    console.error("Error registering car:", error);
    throw error;
  }
};
