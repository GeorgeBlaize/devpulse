"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const issue_controller_1 = require("./issue.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, issue_controller_1.createIssue);
router.get("/", issue_controller_1.getAllIssues);
router.get("/:id", issue_controller_1.getSingleIssue);
router.patch("/:id", auth_middleware_1.authMiddleware, issue_controller_1.updateIssue);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("maintainer"), issue_controller_1.deleteIssue);
exports.default = router;
//# sourceMappingURL=issue.routes.js.map