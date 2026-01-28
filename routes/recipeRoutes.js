import { Router } from 'express';
import { createRecipe, deleteRecipe, getFavorites, getRecipeById, getRecipes, getRecipesByIngredients, toggleFavorite, updateRecipe } from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
const router = Router();

router.get('/', authMiddleware, getRecipes);
router.get('/my', authMiddleware, getMyRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post(
    '/',
    authMiddleware,
    (req, res, next) => {
        console.log('🎯 Antes de Multer');
        next();
    },
    upload.single('image'),
    (req, res, next) => {
        console.log('=== CHECKPOINT DESPUÉS DE MULTER ===');
        console.log('Headers:', req.headers);
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);
        console.log('===================================');

        // Si no hay req.file, es porque Cloudinary falló
        if (!req.file && req.headers['content-type']?.includes('multipart/form-data')) {
            console.error('❌ Multer procesó multipart pero no generó req.file');
        }

        next();
    },
    createRecipe
);

router.put('/:id', authMiddleware, upload.single('image'), updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);
router.post('/by-ingredients',
    authMiddleware, getRecipesByIngredients);
router.post('/:id/favorite', authMiddleware, toggleFavorite);
router.get('/favorites/all', authMiddleware, getFavorites);


export default router;