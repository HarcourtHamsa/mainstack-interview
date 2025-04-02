import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { CartModel } from "../../models/cart";

async function getCartHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = (req as CustomRequest).user;

    const cart = await CartModel.findOne({ owner: id }).populate(
      "items.product"
    );

    res.status(HttpStatus.Ok).json({
      message: "Cart retrieved successfully",
      data: cart || [],
    });
  } catch (error) {
    next(error);
  }
}

export default getCartHandler;
