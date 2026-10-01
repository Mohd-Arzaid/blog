import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config/config.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Spread operator (...) spreads/copies the properties of an object into a new object
  // Example:
  // const user = { name: "Arzaid", age: 23 };
  // const newUser = { ...user };
  // Here, user properties are copied into newUser
  let error = { ...err };
  // This creates a new object called "error"
  // by copying the properties of "err" into it

  // why we did this ?
  // we create a copy of err so we can process/modify the error
  // without changing the original error object

  // now err and error are different objects because of shallow copy
  // so, if one object's top-level properties change, it will not affect the other one
  

  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";

  // In development, return detailed error information to make debugging easier
  if (NODE_ENV === "development") {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: err.stack,
      error,
    });
  }

  // Check if this is a known and safely handled error
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
