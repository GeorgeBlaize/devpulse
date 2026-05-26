import { Router } from "express";
import { login, signup } from "./auth.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { deleteIssue } from "../issues/issue.controller";
import { requireRole } from "../../middleware/role.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("maintainer"),   // Only maintainer can delete
  deleteIssue
);
export default router;