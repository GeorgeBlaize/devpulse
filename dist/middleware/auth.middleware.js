"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(" Received Authorization Header:", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - No token provided"
            });
        }
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
            console.log("Token after removing Bearer prefix");
        }
        console.log("Final Token being verified:", token.substring(0, 30) + "...");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("Token Verified Successfully! User:", decoded.name, "| Role:", decoded.role);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("JWT Verify Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map