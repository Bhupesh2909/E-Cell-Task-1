import express from "express";
const router = express.Router();

import { getApplications, createApplication } from "../controllers/internController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/", protect, getApplications);
router.post("/apply", protect, createApplication);

export default router;