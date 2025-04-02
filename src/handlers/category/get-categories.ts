import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/http";
import { CategoryModel } from "../../models/category";

async function getCategoriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await CategoryModel.find();

    res.status(HttpStatus.Ok).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

export default getCategoriesHandler;
