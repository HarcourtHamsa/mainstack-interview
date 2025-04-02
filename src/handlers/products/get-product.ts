import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/http";
import { ProductModel } from "../../models/product";

async function getProductHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id)
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
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export default getProductHandler;
