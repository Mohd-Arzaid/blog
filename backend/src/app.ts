import express, { Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config/config.js";
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);

// test route - /health-check
app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "API is working fine!",
  });
});

import authRouter from "./modules/auth/auth.route.js";
app.use("/api/v1/auth", authRouter);

app.use(globalErrorHandler);
