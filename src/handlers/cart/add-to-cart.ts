import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { ProductModel } from "../../models/product";
import { ICartItem } from "../../types/cart";
import { CartModel } from "../../models/cart";
import mongoose from "mongoose";
import { HttpException } from "../../utils/http";

async function addToCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = req.body;
    const { id } = (req as CustomRequest).user;

    let costOfProductsInCart = 0;

    // Validate items and update stock
    await Promise.all(
      items.map(async (item: ICartItem) => {
        const product = await ProductModel.findById(item.product).session(
          session
        );

        if (!product) {
          throw new HttpException(HttpStatus.BadRequest, "Product not found");
        }
        if (product.stock < item.quantity) {
          throw new HttpException(
            HttpStatus.BadRequest,
            "Product stock is not enough"
          );
        }

        // Reduce product stock
        product.stock -= item.quantity;
        await product.save({ session });

        // Calculate total price for cart
        costOfProductsInCart += product.price!.amount * item.quantity;
      })
    );

    // Check if cart exists
    const cartExists = await CartModel.findOne({ owner: id }).session(session);

    if (cartExists) {
      const currentAmount = cartExists.amount ? Number(cartExists.amount) : 0;
      const totalAmount = currentAmount + costOfProductsInCart;

      await CartModel.findOneAndUpdate(
        { owner: id },
        {
          amount: totalAmount,
          $push: {
            items: {
              $each: items,
            },
          },
        },
        { new: true, session }
      );
    } else {
      await CartModel.create(
        [
          {
            owner: id,
            items,
            amount: costOfProductsInCart,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    res
      .status(200)
      .json({ message: "Items added to cart successfully", data: {} });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession(); // Ensure session always ends
  }
}

export default addToCartHandler;
