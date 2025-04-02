import {
  DEFAULT_ADMIN,
  DEFAULT_CATEGORIES,
  DEFAULT_CURRENCIES,
  DEFAULT_ROLES,
} from "../constants";
import { AccountModel } from "../models/account";
import { CategoryModel } from "../models/category";
import { CurrencyModel } from "../models/currency";
import { RoleModel } from "../models/role";
import { AccountRole } from "../types/account";

const seedRole = async () => {
  const roles = await RoleModel.countDocuments();

  if (roles === 0) {
    await RoleModel.insertMany(DEFAULT_ROLES);
  }

  console.log("\x1b[32m%s\x1b[0m", "Role seeding completed");
};

const seedAdmin = async () => {
  const admin = await AccountModel.countDocuments({
    emailAddress: DEFAULT_ADMIN.emailAddress,
  });

  if (admin === 0) {
    const adminRole = await RoleModel.findOne({ name: AccountRole.Admin });

    await AccountModel.create({ ...DEFAULT_ADMIN, role: adminRole!.id });
  }

  console.log("\x1b[32m%s\x1b[0m", "Admin seeding completed");
};

const seedCategories = async () => {
  const categories = await CategoryModel.countDocuments();

  if (categories === 0) {
    await CategoryModel.insertMany(DEFAULT_CATEGORIES);
  }

  console.log("\x1b[32m%s\x1b[0m", "Category seeding completed");
};

const seedCurrencies = async () => {
  const currencies = await CurrencyModel.countDocuments();

  if (currencies === 0) {
    await CurrencyModel.insertMany(DEFAULT_CURRENCIES);
  }

  console.log("\x1b[32m%s\x1b[0m", "Currency seeding completed");
};

export const runSeed = async () => {
  try {
    await seedRole();
    await seedAdmin();
    await seedCategories();
    await seedCurrencies();

    console.log("\x1b[32m%s\x1b[0m", "All seeding completed successfully");
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Seeding failed:", error);
    process.exit(1);
  }
};
