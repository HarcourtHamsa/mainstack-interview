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
exports.db = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const databaseUrl = process.env.MONGO_URI;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(databaseUrl, { dbName: "mainstack-interview" });
});
exports.connectDB = connectDB;
exports.db = mongoose_1.default.connection;
exports.db.on("connected", () => console.log("Connected to Database"));
exports.db.on("disconnected", () => console.log("Disconnected from Database"));
exports.db.on("close", () => console.log("Database connection closed"));
exports.db.on("error", (error) => console.log("Database connection error:", error));
