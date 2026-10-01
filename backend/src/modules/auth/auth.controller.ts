import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";

export const registerUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  },
);
