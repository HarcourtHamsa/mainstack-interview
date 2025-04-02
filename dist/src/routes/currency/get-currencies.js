"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_currencies_1 = __importDefault(require("../../handlers/currency/get-currencies"));
const router = express_1.default.Router();
router.get("/", get_currencies_1.default);
exports.default = router;
