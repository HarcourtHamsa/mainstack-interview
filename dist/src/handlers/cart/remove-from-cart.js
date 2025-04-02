"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../../types/http");
const product_1 = require("../../models/product");
const cart_1 = require("../../models/cart");
const mongoose_1 = __importDefault(require("mongoose"));
const http_2 = require("../../utils/http");
function removeFromCartHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const { items } = req.body;
            const { id } = req.user;
            const cart = yield cart_1.CartModel.findOne({ owner: id }).session(session);
            if (!cart) {
                throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Cart not found");
            }
            yield Promise.all(items.map((itemToRemove) => __awaiter(this, void 0, void 0, function* () {
                const product = yield product_1.ProductModel.findById(itemToRemove.product).session(session);
                if (!product) {
                    throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Product not found");
                }
                // Find the matching item in the cart
                const cartItem = cart.items.find((item) => item.product.toString() === itemToRemove.product);
                if (!cartItem) {
                    throw new http_2.HttpException(http_1.HttpStatus.BadRequest, `Product ${itemToRemove.product} not in cart`);
                }
                // Check if quantity to remove is valid
                if (itemToRemove.quantity > cartItem.quantity) {
                    throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Cannot remove more items than what's in the cart");
                }
                // Calculate amount to reduce from cart total
                const amountToReduce = product.price.amount * itemToRemove.quantity;
                // Return stock to product
                product.stock += itemToRemove.quantity;
                yield product.save({ session });
                // Update cart amount
                cart.amount -= amountToReduce;
                // Update item quantity or remove it entirely
                if (itemToRemove.quantity === cartItem.quantity) {
                    // Remove the entire item
                    cart.items = cart.items.filter((item) => item.product.toString() !== itemToRemove.product);
                }
                else {
                    // Reduce the quantity
                    cartItem.quantity -= itemToRemove.quantity;
                }
            })));
            if (cart.items.length < 1) {
                // If all items removed, delete the cart
                yield cart_1.CartModel.findOneAndDelete({ owner: id }).session(session);
            }
            else {
                // Otherwise save the updated cart
                yield cart.save({ session });
            }
            yield session.commitTransaction();
            res
                .status(http_1.HttpStatus.Ok)
                .json({ message: "Items removed from cart successfully", data: {} });
        }
        catch (error) {
            yield session.abortTransaction();
            next(error);
        }
        finally {
            session.endSession(); // Ensure session always ends
        }
    });
}
exports.default = removeFromCartHandler;
