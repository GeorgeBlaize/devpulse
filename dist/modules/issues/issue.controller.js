"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.updateIssue = exports.getSingleIssue = exports.getAllIssues = exports.createIssue = void 0;
const response_1 = require("../../utils/response");
const issue_service_1 = require("./issue.service");
const createIssue = async (req, res) => {
    try {
        const { title, description, type } = req.body;
        const issue = await (0, issue_service_1.createIssueService)(title, description, type, req.user.id);
        return (0, response_1.sendResponse)(res, 201, true, "Issue created successfully", issue);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Issue creation failed", null, error.message);
    }
};
exports.createIssue = createIssue;
const getAllIssues = async (req, res) => {
    try {
        const { sort, type, status } = req.query;
        const issues = await (0, issue_service_1.getAllIssuesService)(sort, type, status);
        return (0, response_1.sendResponse)(res, 200, true, "Issues retrieved successfully", issues);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Failed to fetch issues", null, error.message);
    }
};
exports.getAllIssues = getAllIssues;
const getSingleIssue = async (req, res) => {
    try {
        const issue = await (0, issue_service_1.getSingleIssueService)(req.params.id);
        if (!issue)
            return (0, response_1.sendResponse)(res, 404, false, "Issue not found");
        return (0, response_1.sendResponse)(res, 200, true, "Issue retrieved successfully", issue);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Failed to fetch issue", null, error.message);
    }
};
exports.getSingleIssue = getSingleIssue;
const updateIssue = async (req, res) => {
    try {
        const { title, description, type } = req.body;
        const issue = await (0, issue_service_1.updateIssueService)(req.params.id, title, description, type);
        return (0, response_1.sendResponse)(res, 200, true, "Issue updated successfully", issue);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Update failed", null, error.message);
    }
};
exports.updateIssue = updateIssue;
const deleteIssue = async (req, res) => {
    try {
        const deleted = await (0, issue_service_1.deleteIssueService)(req.params.id);
        if (deleted === 0) {
            return (0, response_1.sendResponse)(res, 404, false, "Issue not found");
        }
        return (0, response_1.sendResponse)(res, 200, true, "Issue deleted successfully");
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Delete failed", null, error.message);
    }
};
exports.deleteIssue = deleteIssue;
//# sourceMappingURL=issue.controller.js.map