"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRole = exports.AccountStatus = void 0;
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Active"] = "active";
    AccountStatus["Inactive"] = "inactive";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var AccountRole;
(function (AccountRole) {
    AccountRole["User"] = "User";
    AccountRole["Admin"] = "Admin";
})(AccountRole || (exports.AccountRole = AccountRole = {}));
