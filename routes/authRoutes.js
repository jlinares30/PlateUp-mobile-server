import { Router } from 'express';
import { login, register, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authMiddleware, updateProfile);

export default router;
