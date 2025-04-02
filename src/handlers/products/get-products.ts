import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/http";
import { ProductModel } from "../../models/product";

async function getProductsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await ProductModel.find()
      .populate({
        path: "category",
        select: "name description",
      })
      .populate({
        path: "price",
        populate: {
          path: "currency",
          select: "name symbol",
        },
      });

    res.status(HttpStatus.Ok).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
}

export default getProductsHandler;
