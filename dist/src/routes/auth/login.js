"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const http_1 = require("../../types/http");
const login_1 = __importDefault(require("../../handlers/auth/login"));
const router = express_1.default.Router();
const validateRequest = () => {
    return [
        (0, express_validator_1.body)("emailAddress").isEmail().withMessage("Email address must be valid"),
        (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required"),
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(http_1.HttpStatus.BadRequest).json({ errors: errors.array() });
            }
            next();
        },
    ];
};
/**
 * @description Endpoint to login a user
 * @method POST
 * @access Public
 * @route v1/auth/login
 */
router.post("/login", validateRequest(), login_1.default);
exports.default = router;
