import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { getDashboardStats } from '../controllers/statsController.js';

const router = express.Router();

router.get('/', protect, getDashboardStats);

export default router;
