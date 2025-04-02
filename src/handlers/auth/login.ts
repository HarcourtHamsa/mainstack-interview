import { NextFunction, Request, Response } from "express";
import { AccountModel } from "../../models/account";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import jwt from "jsonwebtoken";

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { emailAddress, password } = req.body;

    const account = await AccountModel.findOne({ emailAddress }).populate(
      "role"
    );

    if (!account) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "User with email address not found"
      );
    }

    const passwordIsValid = await account.comparePassword(password);

    if (!passwordIsValid) {
      throw new HttpException(HttpStatus.BadRequest, "Invalid credentials");
    }

    const payload = {
      id: account.id,
      emailAddress: account.emailAddress,
      role: typeof account.role === "string" ? account.role : account.role.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(HttpStatus.Ok).json({
      message: "Logged in successfully",
      data: {
        token,
        account,
      },
    });
  } catch (error) {
    next(error);
  }
}

export default loginHandler;
