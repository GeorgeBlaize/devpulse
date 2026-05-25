"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../config/db");
const createUser = async (name, email, password, role = "contributor") => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at, updated_at
  `;
    const values = [name, email, hashedPassword, role];
    const result = await db_1.pool.query(query, values);
    return result.rows[0];
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const result = await db_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=auth.service.js.map