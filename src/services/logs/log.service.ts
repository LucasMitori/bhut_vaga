import mongoose from "mongoose";
import Log from "../../models/log.model";
import { AppError } from "../../errors";
require("dotenv").config();

export const getLogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const logs = await Log.find({});

    return logs;
  } catch (error) {
    throw new AppError(`Error getting logs: ${error}`, 404);
  }
};
