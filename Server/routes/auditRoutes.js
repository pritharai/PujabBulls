import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { getImageAuditLogs } from "../controllers/auditController.js";

const router = express.Router();
// reploy commit - 1
router.get("/image-events", protectAdmin, getImageAuditLogs);

export default router;
