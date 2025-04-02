import { NextFunction, Request, Response } from "express";
import { AccountRole } from "../types/account";
import { CustomRequest, HttpStatus } from "../types/http";

function roleMiddleware(
  requiredRole: AccountRole
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as CustomRequest;

    if (user.role !== requiredRole) {
      return res.status(HttpStatus.Forbidden).json({ error: "Forbidden" });
    }

    next();
  };
}

export default roleMiddleware;
