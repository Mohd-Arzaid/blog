import { NextFunction, Request, Response } from "express";

// CatchAsync is a Higher-Order Function (HOF) → a function that takes another function
// as an argument or returns another function
export const CatchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const promise = fn(req, res, next);

    promise.catch((error) => {
      next(error);
    });
    // Same as:
    // fn(req, res, next).catch(next);
  };
};
