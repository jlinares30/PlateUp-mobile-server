import { Router } from 'express';
import { cloneMealPlan, createMealPlan, deleteMealPlan, getMealPlanById, getMealPlans, getMyMealPlans, updateMealPlan } from '../controllers/mealPlanController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import logger from '../config/logger.js';
const router = Router();

router.get('/', authMiddleware, getMealPlans);
router.get('/my', authMiddleware, getMyMealPlans);
router.post('/clone', authMiddleware, cloneMealPlan);
router.get('/:id', authMiddleware, getMealPlanById); // :id must be after static paths like /my
router.post(
    '/',
    authMiddleware,
    upload.single('image'),
    (req, res, next) => {
        logger.info('Headers:', req.headers);
        logger.info('req.file:', req.file);
        logger.info('req.body:', JSON.stringify(req.body, null, 2));

        if (!req.file && req.headers['content-type']?.includes('multipart/form-data')) {
            logger.error('❌ Multer procesó multipart pero no generó req.file');
        }
        next();
    },
    createMealPlan
);
router.put('/:id', authMiddleware, upload.single('image'), updateMealPlan);
router.delete('/:id', authMiddleware, deleteMealPlan);

export default router;

