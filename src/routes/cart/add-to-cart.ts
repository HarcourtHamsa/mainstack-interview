import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import protectMiddleware from "../../middlewares/protect";
import addToCartHandler from "../../handlers/cart/add-to-cart";

const router = express.Router();

const validateRequest = () => {
  return [
    body("items")
      .isArray({ min: 1 })
      .notEmpty()
      .withMessage("Items is required")
      .custom((value) => {
        const items = value as { product: string; quantity: number }[];

        const isValid = items.every((item) => {
          return item.product && item.quantity > 0;
        });

        if (!isValid) {
          throw new Error("Invalid items");
        }

        return true;
      }),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

router.post("/", validateRequest(), protectMiddleware, addToCartHandler);

export default router;
