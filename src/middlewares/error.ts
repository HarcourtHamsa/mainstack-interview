import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/http";

async function errorMiddleware(
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message,
  });
}

export default errorMiddleware;
