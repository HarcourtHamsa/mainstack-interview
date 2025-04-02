import express from "express";
import createProductRoute from "./create-product";
import getProductsRoute from "./get-products";
import getProductRoute from "./get-product";

const router = express.Router();

router.use("/product", createProductRoute);
router.use("/products", getProductsRoute);
router.use("/product", getProductRoute);

export default router;
