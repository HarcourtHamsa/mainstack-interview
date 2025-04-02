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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = void 0;
const constants_1 = require("../constants");
const account_1 = require("../models/account");
const category_1 = require("../models/category");
const currency_1 = require("../models/currency");
const role_1 = require("../models/role");
const account_2 = require("../types/account");
const seedRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_1.RoleModel.countDocuments();
    if (roles === 0) {
        yield role_1.RoleModel.insertMany(constants_1.DEFAULT_ROLES);
    }
    console.log("\x1b[32m%s\x1b[0m", "Role seeding completed");
});
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield account_1.AccountModel.countDocuments({
        emailAddress: constants_1.DEFAULT_ADMIN.emailAddress,
    });
    if (admin === 0) {
        const adminRole = yield role_1.RoleModel.findOne({ name: account_2.AccountRole.Admin });
        yield account_1.AccountModel.create(Object.assign(Object.assign({}, constants_1.DEFAULT_ADMIN), { role: adminRole.id }));
    }
    console.log("\x1b[32m%s\x1b[0m", "Admin seeding completed");
});
const seedCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_1.CategoryModel.countDocuments();
    if (categories === 0) {
        yield category_1.CategoryModel.insertMany(constants_1.DEFAULT_CATEGORIES);
    }
    console.log("\x1b[32m%s\x1b[0m", "Category seeding completed");
});
const seedCurrencies = () => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield currency_1.CurrencyModel.countDocuments();
    if (currencies === 0) {
        yield currency_1.CurrencyModel.insertMany(constants_1.DEFAULT_CURRENCIES);
    }
    console.log("\x1b[32m%s\x1b[0m", "Currency seeding completed");
});
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield seedRole();
        yield seedAdmin();
        yield seedCategories();
        yield seedCurrencies();
        console.log("\x1b[32m%s\x1b[0m", "All seeding completed successfully");
    }
    catch (error) {
        console.error("\x1b[31m%s\x1b[0m", "Seeding failed:", error);
        process.exit(1);
    }
});
exports.runSeed = runSeed;
