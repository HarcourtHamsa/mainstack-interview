import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../types/http";
import { ProductModel } from "../../../models/product";
import { HttpException } from "../../../utils/http";
import { CurrencyModel } from "../../../models/currency";
import { CategoryModel } from "../../../models/category";

async function createProductHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, currency, stock, description, category, amount } = req.body;

    const existingProduct = await ProductModel.findOne({ name });

    if (existingProduct) {
      throw new HttpException(HttpStatus.BadRequest, "Product already exists");
    }

    const categoryExists = await CategoryModel.findById(category);

    if (!categoryExists) {
      throw new HttpException(HttpStatus.BadRequest, "Category does not exist");
    }

    const currencyExists = await CurrencyModel.findById(currency);

    if (!currencyExists) {
      throw new HttpException(HttpStatus.BadRequest, "Currency does not exist");
    }

    const product = await ProductModel.create({
      name,
      price: {
        currency,
        amount,
      },
      stock,
      description,
      category,
    });

    res.status(HttpStatus.Created).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export default createProductHandler;
