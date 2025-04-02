"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protect_1 = __importDefault(require("../../middlewares/protect"));
const get_cart_1 = __importDefault(require("../../handlers/cart/get-cart"));
const router = express_1.default.Router();
router.get("/", protect_1.default, get_cart_1.default);
exports.default = router;
