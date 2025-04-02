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
const account_1 = require("../../models/account");
const http_1 = require("../../utils/http");
const http_2 = require("../../types/http");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { emailAddress, password } = req.body;
            const account = yield account_1.AccountModel.findOne({ emailAddress }).populate("role");
            if (!account) {
                throw new http_1.HttpException(http_2.HttpStatus.BadRequest, "User with email address not found");
            }
            const passwordIsValid = yield account.comparePassword(password);
            if (!passwordIsValid) {
                throw new http_1.HttpException(http_2.HttpStatus.BadRequest, "Invalid credentials");
            }
            const payload = {
                id: account.id,
                emailAddress: account.emailAddress,
                role: typeof account.role === "string" ? account.role : account.role.name,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(http_2.HttpStatus.Ok).json({
                message: "Logged in successfully",
                data: {
                    token,
                    account,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = loginHandler;
