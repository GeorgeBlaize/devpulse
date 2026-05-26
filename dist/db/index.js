"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.pool = void 0;
const pg_1 = require("pg");
const env_1 = __importDefault(require("../config/env"));
console.log("Using DATABASE_URL:", env_1.default.connection_string ? "Loaded ✅" : "MISSING ❌");
exports.pool = new pg_1.Pool({
    connectionString: env_1.default.connection_string,
    ssl: {
        rejectUnauthorized: false,
    },
});
const initDB = async () => {
    try {
        console.log("⏳ Connecting to Neon Database...");
        await exports.pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
        await exports.pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL CHECK (LENGTH(description) >= 20),
        type VARCHAR(50) NOT NULL CHECK (type IN ('bug', 'feature_request')),
        status VARCHAR(50) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
        reporter_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
        console.log("Successfully connected to Neon Database & Tables initialized!");
    }
    catch (error) {
        console.error("Database Error:", error.message);
        throw error;
    }
};
exports.initDB = initDB;
//# sourceMappingURL=index.js.map