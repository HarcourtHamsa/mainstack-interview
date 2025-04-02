import express from "express";
import getProductHandler from "../../handlers/products/get-product";

const router = express.Router();

router.get("/:id", getProductHandler);

export default router;
