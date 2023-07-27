import { Request, Response } from "express";
import { getLogs } from "../services/logs/log.service";

export const handleGetLogs = async (req: Request, res: Response) => {
  try {
    const logs = await getLogs();
    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get logs" });
  }
};
