"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const create_product_1 = __importDefault(require("../../handlers/admin/products/create-product"));
const protect_1 = __importDefault(require("../../middlewares/protect"));
const role_1 = __importDefault(require("../../middlewares/role"));
const account_1 = require("../../types/account");
const router = express_1.default.Router();
const validateRequest = () => {
    return [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
        (0, express_validator_1.body)("currency").notEmpty().withMessage("Currency is required"),
        (0, express_validator_1.body)("stock").notEmpty().withMessage("Stock is required"),
        (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
        (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
        (0, express_validator_1.body)("amount").notEmpty().withMessage("Amount is required"),
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            next();
        },
    ];
};
router.post("/", validateRequest(), protect_1.default, (0, role_1.default)(account_1.AccountRole.Admin), create_product_1.default);
exports.default = router;
