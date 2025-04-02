"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const account_1 = require("../types/account");
const constants_1 = require("../constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const accountSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: [true, "Email address already exists"],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(account_1.AccountStatus),
        default: account_1.AccountStatus.Active,
    },
}, {
    discriminatorKey: constants_1.ACCOUNT_DISCRIMATORY_KEY,
    timestamps: true,
});
accountSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = bcrypt_1.default.hashSync(this.password, 10);
    next();
});
accountSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
accountSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
accountSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
exports.AccountModel = mongoose_1.default.model("Account", accountSchema);
