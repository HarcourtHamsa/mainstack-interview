"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_to_cart_1 = __importDefault(require("./add-to-cart"));
const get_cart_1 = __importDefault(require("./get-cart"));
const remove_from_cart_1 = __importDefault(require("./remove-from-cart"));
const router = express_1.default.Router();
router.use("/cart", add_to_cart_1.default);
router.use("/cart", get_cart_1.default);
router.use("/cart", remove_from_cart_1.default);
exports.default = router;
