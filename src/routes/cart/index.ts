import express from "express";
import addToCartRoute from "./add-to-cart";
import getCartRoute from "./get-cart";
import removeFromCartRoute from "./remove-from-cart";

const router = express.Router();

router.use("/cart", addToCartRoute);
router.use("/cart", getCartRoute);
router.use("/cart", removeFromCartRoute);

export default router;
