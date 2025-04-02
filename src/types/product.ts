import { ObjectId } from "mongoose";
import { ICurrency } from "./currency";
import { ICategory } from "./category";

export interface IProduct {
  name: string;
  description: string;
  price: {
    currency: ICurrency | ObjectId;
    amount: number;
  };
  image: string;
  stock: number;
  category: ICategory | ObjectId;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
