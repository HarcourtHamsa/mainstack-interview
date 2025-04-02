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
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../../types/http");
const cart_1 = require("../../models/cart");
function getCartHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.user;
            const cart = yield cart_1.CartModel.findOne({ owner: id }).populate("items.product");
            res.status(http_1.HttpStatus.Ok).json({
                message: "Cart retrieved successfully",
                data: cart || [],
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = getCartHandler;
