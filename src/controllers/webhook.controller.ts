import { Request, Response } from "express";

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    console.log("Webhook received:", req.body);
    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: "Failed to process webhook" });
  }
};
