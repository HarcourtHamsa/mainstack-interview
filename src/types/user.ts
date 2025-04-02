import { AccountStatus } from "./account";

export interface IUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  status: AccountStatus;
}
