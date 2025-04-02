"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        currency: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Currency",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    image: {
        type: String,
        default: "https://placehold.co/600x400",
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, {
    timestamps: true,
});
productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
exports.ProductModel = mongoose_1.default.model("Product", productSchema);
