"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const issue_controller_1 = require("../issues/issue.controller");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signup);
router.post("/login", auth_controller_1.login);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("maintainer"), // Only maintainer can delete
issue_controller_1.deleteIssue);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map