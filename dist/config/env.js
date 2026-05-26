"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    connection_string: process.env.DATABASE_URL,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
};
exports.default = config;
//# sourceMappingURL=env.js.map