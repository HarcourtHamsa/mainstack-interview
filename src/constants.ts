import { AccountStatus } from "./types/account";

export const DEFAULT_ADMIN = {
  emailAddress: "admin@admin.com",
  password: "admin",
  firstName: "John",
  lastName: "Doe",
  status: AccountStatus.Active,
};

export const DEFAULT_ROLES = [
  {
    name: "Admin",
  },
  {
    name: "User",
  },
];

export const DEFAULT_CURRENCIES = [
  {
    name: "US Dollar",
    symbol: "$",
    code: "USD",
  },
  {
    name: "Euro",
    symbol: "€",
    code: "EUR",
  },
  {
    name: "British Pound",
    symbol: "£",
    code: "GBP",
  },
  {
    name: "Japanese Yen",
    symbol: "¥",
    code: "JPY",
  },
  {
    name: "Canadian Dollar",
    symbol: "CA$",
    code: "CAD",
  },
  {
    name: "Chinese Yuan",
    symbol: "¥",
    code: "CNY",
  },
  {
    name: "Indian Rupee",
    symbol: "₹",
    code: "INR",
  },
  {
    name: "Nigerian Naira",
    symbol: "₦",
    code: "NGN",
  },
];

export const ACCOUNT_DISCRIMATORY_KEY = "account";

export const DEFAULT_CATEGORIES = [
  {
    name: "Electronics",
    description: "Electronics products",
  },
  {
    name: "Clothing",
    description: "Clothing products",
  },
  {
    name: "Beauty & Personal Care",
    description: "Beauty & Personal Care products",
  },
  {
    name: "Books & Media",
    description: "Books & Media products",
  },
  {
    name: "Health & Wellness",
    description: "Health & Wellness products",
  },
  {
    name: "Office Supplies",
    description: "Office Supplies products",
  },
  {
    name: "Food & Beverages",
    description: "Food & Beverages products",
  },
];
