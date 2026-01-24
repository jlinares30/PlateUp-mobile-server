import { Router } from 'express'
import { getAllIngredients, createIngredient, getIngredientById } from '../controllers/ingredientsController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

import upload from '../middlewares/upload.js';

const router = Router();

router.get('/', authMiddleware, getAllIngredients);
router.get('/:id', authMiddleware, getIngredientById);
router.post('/', authMiddleware, upload.single('image'), createIngredient);

export default router;