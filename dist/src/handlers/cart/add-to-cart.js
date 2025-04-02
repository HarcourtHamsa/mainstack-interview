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
function addToCartHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const { items } = req.body;
            const { id } = req.user;
            let costOfProductsInCart = 0;
            // Validate items and update stock
            yield Promise.all(items.map((item) => __awaiter(this, void 0, void 0, function* () {
                const product = yield product_1.ProductModel.findById(item.product).session(session);
                if (!product) {
                    throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Product not found");
                }
                if (product.stock < item.quantity) {
                    throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Product stock is not enough");
                }
                // Reduce product stock
                product.stock -= item.quantity;
                yield product.save({ session });
                // Calculate total price for cart
                costOfProductsInCart += product.price.amount * item.quantity;
            })));
            // Check if cart exists
            const cartExists = yield cart_1.CartModel.findOne({ owner: id }).session(session);
            if (cartExists) {
                const currentAmount = cartExists.amount ? Number(cartExists.amount) : 0;
                const totalAmount = currentAmount + costOfProductsInCart;
                yield cart_1.CartModel.findOneAndUpdate({ owner: id }, {
                    amount: totalAmount,
                    $push: {
                        items: {
                            $each: items,
                        },
                    },
                }, { new: true, session });
            }
            else {
                yield cart_1.CartModel.create([
                    {
                        owner: id,
                        items,
                        amount: costOfProductsInCart,
                    },
                ], { session });
            }
            yield session.commitTransaction();
            res
                .status(200)
                .json({ message: "Items added to cart successfully", data: {} });
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
exports.default = addToCartHandler;
