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
const http_1 = require("../../../types/http");
const product_1 = require("../../../models/product");
const http_2 = require("../../../utils/http");
const currency_1 = require("../../../models/currency");
const category_1 = require("../../../models/category");
function createProductHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, currency, stock, description, category, amount } = req.body;
            const existingProduct = yield product_1.ProductModel.findOne({ name });
            if (existingProduct) {
                throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Product already exists");
            }
            const categoryExists = yield category_1.CategoryModel.findById(category);
            if (!categoryExists) {
                throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Category does not exist");
            }
            const currencyExists = yield currency_1.CurrencyModel.findById(currency);
            if (!currencyExists) {
                throw new http_2.HttpException(http_1.HttpStatus.BadRequest, "Currency does not exist");
            }
            const product = yield product_1.ProductModel.create({
                name,
                price: {
                    currency,
                    amount,
                },
                stock,
                description,
                category,
            });
            res.status(http_1.HttpStatus.Created).json({
                message: "Product created successfully",
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = createProductHandler;
