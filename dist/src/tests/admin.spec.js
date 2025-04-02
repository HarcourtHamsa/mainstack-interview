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
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const app_1 = require("../app");
globals_1.jest.mock("../models/product", () => {
    const mockModel = {
        find: globals_1.jest.fn().mockImplementation(() => {
            return {
                populate: globals_1.jest.fn().mockReturnThis(),
                exec: globals_1.jest.fn().mockResolvedValue([
                    {
                        _id: "1",
                        name: "Product 1",
                        price: { currency: "67e583b361b43c3fabeec39d", amount: 200 },
                        description: "Description 1",
                        stock: 10,
                        category: "67e5834112258a9780099bb5",
                    },
                    {
                        _id: "2",
                        name: "Product 2",
                        price: { currency: "67e583b361b43c3fabeec39d", amount: 200 },
                        description: "Description 2",
                        stock: 10,
                        category: "67e5834112258a9780099bb5",
                    },
                ]),
            };
        }),
    };
    return {
        ProductModel: mockModel,
    };
});
(0, globals_1.describe)("GET v1/products", () => {
    (0, globals_1.it)("should return 200 and product list", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/v1/products");
        (0, globals_1.expect)(response.statusCode).toBe(200);
    }));
});
