import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HttpStatus } from "../../types/http";
import loginHandler from "../../handlers/auth/login";

const router = express.Router();

const validateRequest = () => {
  return [
    body("emailAddress").isEmail().withMessage("Email address must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(HttpStatus.BadRequest).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

/**
 * @description Endpoint to login a user
 * @method POST
 * @access Public
 * @route v1/auth/login
 */
router.post("/login", validateRequest(), loginHandler);

export default router;
