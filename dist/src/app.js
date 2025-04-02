"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const limiter_1 = require("./utils/limiter");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = __importDefault(require("./middlewares/error"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)("tiny"));
exports.app.use(limiter_1.rateLimiter);
exports.app.get("/health", (req, res) => {
    res.send("I am healthy");
});
exports.app.use("/v1", routes_1.default);
exports.app.use(error_1.default);
