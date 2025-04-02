import { ObjectId } from "mongoose";

export interface ICurrency {
  id: ObjectId;
  name: string;
  symbol: string;
}
