"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("../../utils/jwt");
const response_1 = require("../../utils/response");
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return (0, response_1.sendResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, "All fields are required");
        }
        const existingUser = await (0, auth_service_1.findUserByEmail)(email);
        if (existingUser) {
            return (0, response_1.sendResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, false, "User already exists");
        }
        const user = await (0, auth_service_1.createUser)(name, email, password, role || "contributor");
        return (0, response_1.sendResponse)(res, http_status_codes_1.StatusCodes.CREATED, true, "User registered successfully", user);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Registration failed", null, error.message);
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.findUserByEmail)(email);
        if (!user) {
            return (0, response_1.sendResponse)(res, 401, false, "Invalid credentials");
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return (0, response_1.sendResponse)(res, 401, false, "Invalid credentials");
        }
        const token = (0, jwt_1.generateToken)({ id: user.id, name: user.name, role: user.role });
        delete user.password;
        return (0, response_1.sendResponse)(res, 200, true, "Login successful", { token, user });
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Login failed", null, error.message);
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map