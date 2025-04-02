import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { ProductModel } from "../../models/product";
import { CartModel } from "../../models/cart";
import mongoose from "mongoose";
import { HttpException } from "../../utils/http";

async function removeFromCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = req.body;
    const { id } = (req as CustomRequest).user;

    const cart = await CartModel.findOne({ owner: id }).session(session);

    if (!cart) {
      throw new HttpException(HttpStatus.BadRequest, "Cart not found");
    }

    await Promise.all(
      items.map(async (itemToRemove: { product: string; quantity: number }) => {
        const product = await ProductModel.findById(
          itemToRemove.product
        ).session(session);

        if (!product) {
          throw new HttpException(HttpStatus.BadRequest, "Product not found");
        }

        // Find the matching item in the cart
        const cartItem = cart.items.find(
          (item) => item.product.toString() === itemToRemove.product
        );

        if (!cartItem) {
          throw new HttpException(
            HttpStatus.BadRequest,
            `Product ${itemToRemove.product} not in cart`
          );
        }

        // Check if quantity to remove is valid
        if (itemToRemove.quantity > cartItem.quantity) {
          throw new HttpException(
            HttpStatus.BadRequest,
            "Cannot remove more items than what's in the cart"
          );
        }

        // Calculate amount to reduce from cart total
        const amountToReduce = product.price!.amount * itemToRemove.quantity;

        // Return stock to product
        product.stock += itemToRemove.quantity;
        await product.save({ session });

        // Update cart amount
        cart.amount -= amountToReduce;

        // Update item quantity or remove it entirely
        if (itemToRemove.quantity === cartItem.quantity) {
          // Remove the entire item
          cart.items = cart.items.filter(
            (item) => item.product.toString() !== itemToRemove.product
          ) as any;
        } else {
          // Reduce the quantity
          cartItem.quantity -= itemToRemove.quantity;
        }
      })
    );

    if (cart.items.length < 1) {
      // If all items removed, delete the cart
      await CartModel.findOneAndDelete({ owner: id }).session(session);
    } else {
      // Otherwise save the updated cart
      await cart.save({ session });
    }

    await session.commitTransaction();
    res
      .status(HttpStatus.Ok)
      .json({ message: "Items removed from cart successfully", data: {} });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession(); // Ensure session always ends
  }
}
export default removeFromCartHandler;
