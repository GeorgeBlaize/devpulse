import { Request, Response } from "express";
import { sendResponse } from "../../utils/response";
import {
  createIssueService,
  getAllIssuesService,
  getSingleIssueService,
  updateIssueService,
  deleteIssueService,
} from "./issue.service";

export const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, type } = req.body;
    const issue = await createIssueService(title, description, type, req.user!.id);
    return sendResponse(res, 201, true, "Issue created successfully", issue);
  } catch (error: any) {
    return sendResponse(res, 500, false, "Issue creation failed", null, error.message);
  }
};

export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query;
    const issues = await getAllIssuesService(sort as string, type as string, status as string);
    return sendResponse(res, 200, true, "Issues retrieved successfully", issues);
  } catch (error: any) {
    return sendResponse(res, 500, false, "Failed to fetch issues", null, error.message);
  }
};

export const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const issue = await getSingleIssueService(req.params.id);
    if (!issue) return sendResponse(res, 404, false, "Issue not found");
    return sendResponse(res, 200, true, "Issue retrieved successfully", issue);
  } catch (error: any) {
    return sendResponse(res, 500, false, "Failed to fetch issue", null, error.message);
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, type } = req.body;
    const issue = await updateIssueService(req.params.id, title, description, type);
    return sendResponse(res, 200, true, "Issue updated successfully", issue);
  } catch (error: any) {
    return sendResponse(res, 500, false, "Update failed", null, error.message);
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    await deleteIssueService(req.params.id);
    return sendResponse(res, 200, true, "Issue deleted successfully");
  } catch (error: any) {
    return sendResponse(res, 500, false, "Delete failed", null, error.message);
  }
};