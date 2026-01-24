import { Router } from 'express';
import { login, register, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import upload from '../middlewares/upload.js';
const router = Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.put('/profile', authMiddleware, upload.single('image'), updateProfile);

export default router;
