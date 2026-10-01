import express, { Request, Response } from "express";

export const app = express();

// test route - /health-check
app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "API is working fine!",
  });
});
