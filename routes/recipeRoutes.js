import { Router } from 'express';
import { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, getRecipesByIngredients } from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
const router = Router();

router.get('/', authMiddleware, getRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post('/', authMiddleware, upload.single('image'), createRecipe);
router.put('/:id', authMiddleware, upload.single('image'), updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);
router.post('/by-ingredients',
    authMiddleware, getRecipesByIngredients);

export default router;