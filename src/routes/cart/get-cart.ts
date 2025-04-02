import express from "express";
import protectMiddleware from "../../middlewares/protect";
import getCartHandler from "../../handlers/cart/get-cart";

const router = express.Router();

router.get("/", protectMiddleware, getCartHandler);

export default router;
