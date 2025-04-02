import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/http";

interface JwtPayload {
  id: string;
  role: string;
}

async function protectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, role } = decoded as JwtPayload;

    (req as CustomRequest).user = { id, role };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default protectMiddleware;
