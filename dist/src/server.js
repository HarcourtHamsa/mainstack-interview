"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const database_1 = require("./config/database");
const seed_1 = require("./auto/seed");
const app_1 = require("./app");
const PORT = process.env.PORT || 80;
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectDB)();
            yield (0, seed_1.runSeed)();
            return true;
        }
        catch (error) {
            console.error("Failed to initialize application:", error);
            return false;
        }
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const initialized = yield initialize();
        if (!initialized) {
            console.error("Server initialization failed, exiting");
            process.exit(1);
        }
        app_1.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
// Start the server
startServer();
