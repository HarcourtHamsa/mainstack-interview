"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../types/http");
function roleMiddleware(requiredRole) {
    return (req, res, next) => {
        const { user } = req;
        if (user.role !== requiredRole) {
            return res.status(http_1.HttpStatus.Forbidden).json({ error: "Forbidden" });
        }
        next();
    };
}
exports.default = roleMiddleware;
