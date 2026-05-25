"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, success, message, data, errors) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        errors,
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.js.map