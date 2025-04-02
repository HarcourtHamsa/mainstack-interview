import { ObjectId } from "mongoose";

export interface ICartItem {
  product: ObjectId;
  quantity: number;
}

export interface ICart {
  owner: string;
  items: [ICartItem];
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
