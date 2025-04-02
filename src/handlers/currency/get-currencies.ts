import { NextFunction, Request, Response } from "express";
import { CurrencyModel } from "../../models/currency";
import { HttpStatus } from "../../types/http";

async function getCurrenciesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currencies = await CurrencyModel.find();

    res.status(HttpStatus.Ok).json({
      message: "Currencies fetched successfully",
      data: currencies,
    });
  } catch (error) {
    next(error);
  }
}

export default getCurrenciesHandler;
