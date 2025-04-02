import express from "express";
import getProductsHandler from "../../handlers/products/get-products";

const router = express.Router();

router.get("/", getProductsHandler);

export default router;
