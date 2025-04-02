import mongoose from "mongoose";
import { AccountDocument, AccountRole, AccountStatus } from "../types/account";
import { ACCOUNT_DISCRIMATORY_KEY } from "../constants";
import bcrypt from "bcrypt";

const accountSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: [true, "Email address already exists"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.Active,
    },
  },
  {
    discriminatorKey: ACCOUNT_DISCRIMATORY_KEY,
    timestamps: true,
  }
);

accountSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

accountSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

accountSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

accountSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export const AccountModel = mongoose.model<AccountDocument>(
  "Account",
  accountSchema
);
