"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CATEGORIES = exports.ACCOUNT_DISCRIMATORY_KEY = exports.DEFAULT_CURRENCIES = exports.DEFAULT_ROLES = exports.DEFAULT_ADMIN = void 0;
const account_1 = require("./types/account");
exports.DEFAULT_ADMIN = {
    emailAddress: "admin@admin.com",
    password: "admin",
    firstName: "John",
    lastName: "Doe",
    status: account_1.AccountStatus.Active,
};
exports.DEFAULT_ROLES = [
    {
        name: "Admin",
    },
    {
        name: "User",
    },
];
exports.DEFAULT_CURRENCIES = [
    {
        name: "US Dollar",
        symbol: "$",
        code: "USD",
    },
    {
        name: "Euro",
        symbol: "€",
        code: "EUR",
    },
    {
        name: "British Pound",
        symbol: "£",
        code: "GBP",
    },
    {
        name: "Japanese Yen",
        symbol: "¥",
        code: "JPY",
    },
    {
        name: "Canadian Dollar",
        symbol: "CA$",
        code: "CAD",
    },
    {
        name: "Chinese Yuan",
        symbol: "¥",
        code: "CNY",
    },
    {
        name: "Indian Rupee",
        symbol: "₹",
        code: "INR",
    },
    {
        name: "Nigerian Naira",
        symbol: "₦",
        code: "NGN",
    },
];
exports.ACCOUNT_DISCRIMATORY_KEY = "account";
exports.DEFAULT_CATEGORIES = [
    {
        name: "Electronics",
        description: "Electronics products",
    },
    {
        name: "Clothing",
        description: "Clothing products",
    },
    {
        name: "Beauty & Personal Care",
        description: "Beauty & Personal Care products",
    },
    {
        name: "Books & Media",
        description: "Books & Media products",
    },
    {
        name: "Health & Wellness",
        description: "Health & Wellness products",
    },
    {
        name: "Office Supplies",
        description: "Office Supplies products",
    },
    {
        name: "Food & Beverages",
        description: "Food & Beverages products",
    },
];
