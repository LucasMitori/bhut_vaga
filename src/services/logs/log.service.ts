import mongoose from "mongoose";
import Log from "../../models/log.model";

const MONGODB_URI = "mongodb://127.0.0.1:27017/bhut_db";

export const getLogs = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const logs = await Log.find({});

    return logs;
  } catch (error) {
    console.error("Error getting logs:", error);
    throw error;
  }
};
