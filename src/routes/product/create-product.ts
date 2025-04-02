import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import createProductHandler from "../../handlers/admin/products/create-product";
import protectMiddleware from "../../middlewares/protect";
import roleMiddleware from "../../middlewares/role";
import { AccountRole } from "../../types/account";

const router = express.Router();

const validateRequest = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("currency").notEmpty().withMessage("Currency is required"),
    body("stock").notEmpty().withMessage("Stock is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("amount").notEmpty().withMessage("Amount is required"),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

router.post(
  "/",
  validateRequest(),
  protectMiddleware,
  roleMiddleware(AccountRole.Admin),
  createProductHandler
);

export default router;
