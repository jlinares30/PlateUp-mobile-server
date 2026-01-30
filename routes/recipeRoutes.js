import { Router } from 'express';
import { createRecipe, deleteRecipe, getFavorites, getMyRecipes, getRecipeById, getRecipes, getRecipesByIngredients, toggleFavorite, updateRecipe } from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import logger from '../config/logger.js';
const router = Router();

router.get('/', authMiddleware, getRecipes);
router.get('/my', authMiddleware, getMyRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post(
    '/',
    authMiddleware,
    upload.single('image'),
    (req, res, next) => {
        logger.info('Headers:', req.headers);
        logger.info('req.file:', req.file);
        logger.info('req.body:', req.body);

        if (!req.file && req.headers['content-type']?.includes('multipart/form-data')) {
            logger.error('❌ Multer procesó multipart pero no generó req.file');
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