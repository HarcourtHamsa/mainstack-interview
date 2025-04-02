"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const product_1 = __importDefault(require("./product"));
const currency_1 = __importDefault(require("./currency"));
const category_1 = __importDefault(require("./category"));
const cart_1 = __importDefault(require("./cart"));
const router = express_1.default.Router();
router.use(auth_1.default);
router.use(product_1.default);
router.use(currency_1.default);
router.use(category_1.default);
router.use(cart_1.default);
exports.default = router;
