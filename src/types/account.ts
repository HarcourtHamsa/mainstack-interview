export enum AccountStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum AccountRole {
  User = "User",
  Admin = "Admin",
}

export interface IAccount {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  role: string | { name: AccountRole };
  status: AccountStatus;
}

export interface AccountMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type AccountDocument = IAccount & Document & AccountMethods;
