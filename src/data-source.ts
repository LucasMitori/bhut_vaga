import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const setDataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "mongodb",
      url: process.env.MONGODB_URI,
      entities: [entitiesPath],
    };
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: "mongodb",
    url: process.env.MONGODB_URI,
    entities: [entitiesPath],
    synchronize: false,
    logging: true,
  };
};

export const AppDataSource = new DataSource(setDataSourceConfig());
