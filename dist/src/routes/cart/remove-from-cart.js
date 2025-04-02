"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const protect_1 = __importDefault(require("../../middlewares/protect"));
const remove_from_cart_1 = __importDefault(require("../../handlers/cart/remove-from-cart"));
const router = express_1.default.Router();
const validateRequest = () => {
    return [
        (0, express_validator_1.body)("items")
            .isArray({ min: 1 })
            .notEmpty()
            .withMessage("Items is required")
            .custom((value) => {
            const items = value;
            const isValid = items.every((item) => {
                return item.product && item.quantity > 0;
            });
            if (!isValid) {
                throw new Error("Invalid items");
            }
            return true;
        }),
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            next();
        },
    ];
};
router.delete("/", validateRequest(), protect_1.default, remove_from_cart_1.default);
exports.default = router;
