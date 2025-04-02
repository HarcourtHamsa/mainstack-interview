"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_product_1 = __importDefault(require("./create-product"));
const get_products_1 = __importDefault(require("./get-products"));
const get_product_1 = __importDefault(require("./get-product"));
const router = express_1.default.Router();
router.use("/product", create_product_1.default);
router.use("/products", get_products_1.default);
router.use("/product", get_product_1.default);
exports.default = router;
