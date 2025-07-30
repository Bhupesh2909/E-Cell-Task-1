import express from 'express';
const router = express.Router();

import { createStartup, getStartups } from '../controllers/startupController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

router.get('/', protect, getStartups);
router.post('/', protect, restrictTo("admin"), createStartup);

export default router;