import express from "express";
import authRoutes from "./auth";
import productRoutes from "./product";
import currencyRoutes from "./currency";
import categoryRoutes from "./category";
import cartRoutes from "./cart";

const router = express.Router();

router.use(authRoutes);
router.use(productRoutes);
router.use(currencyRoutes);
router.use(categoryRoutes);
router.use(cartRoutes);

export default router;
