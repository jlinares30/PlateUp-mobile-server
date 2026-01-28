import { Router } from 'express';
import { cloneMealPlan, createMealPlan, deleteMealPlan, getMealPlanById, getMealPlans, getMyMealPlans, updateMealPlan } from '../controllers/mealPlanController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
const router = Router();

router.get('/', authMiddleware, getMealPlans);
router.get('/my', authMiddleware, getMyMealPlans);
router.post('/clone', authMiddleware, cloneMealPlan);
router.get('/:id', authMiddleware, getMealPlanById); // :id must be after static paths like /my
router.post(
    '/',
    authMiddleware,
    (req, res, next) => {
        console.log('🎯 [MealPlan] Antes de Multer');
        next();
    },
    upload.single('image'),
    (req, res, next) => {
        console.log('=== [MealPlan] CHECKPOINT DESPUÉS DE MULTER ===');
        console.log('Headers:', req.headers);
        console.log('req.file:', req.file);
        // Evitar loguear todo el body si es muy grande, pero útil para debug
        console.log('req.body:', JSON.stringify(req.body, null, 2));
        console.log('==============================================');

        if (!req.file && req.headers['content-type']?.includes('multipart/form-data')) {
            console.error('❌ Multer procesó multipart pero no generó req.file');
        }
        next();
    },
    createMealPlan
);
router.put('/:id', authMiddleware, upload.single('image'), updateMealPlan);
router.delete('/:id', authMiddleware, deleteMealPlan);

export default router;

