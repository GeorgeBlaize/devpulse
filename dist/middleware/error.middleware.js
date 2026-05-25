"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    return (0, response_1.sendResponse)(res, 500, false, "Internal Server Error", null, err.message || "Something went wrong");
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map