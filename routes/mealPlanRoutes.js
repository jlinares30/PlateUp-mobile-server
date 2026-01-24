import { Router } from 'express';
import { getMealPlans, createMealPlan, getMealPlanById, updateMealPlan, deleteMealPlan, getMyMealPlans, cloneMealPlan } from '../controllers/mealPlanController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
const router = Router();

router.get('/', authMiddleware, getMealPlans);
router.get('/my', authMiddleware, getMyMealPlans);
router.post('/clone', authMiddleware, cloneMealPlan);
router.get('/:id', authMiddleware, getMealPlanById); // :id must be after static paths like /my
router.post('/', authMiddleware, upload.single('image'), createMealPlan);
router.put('/:id', authMiddleware, upload.single('image'), updateMealPlan);
router.delete('/:id', authMiddleware, deleteMealPlan);

export default router;

