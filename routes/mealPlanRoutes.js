import { Router } from 'express';
import { getMealPlans, createMealPlan, getMealPlanById, updateMealPlan, deleteMealPlan, getMyMealPlans, cloneMealPlan } from '../controllers/mealPlanController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware, getMealPlans);
router.get('/my', authMiddleware, getMyMealPlans);
router.post('/clone', authMiddleware, cloneMealPlan);
router.get('/:id', authMiddleware, getMealPlanById); // :id must be after static paths like /my
router.post('/', authMiddleware, createMealPlan);
router.put('/:id', authMiddleware, updateMealPlan);
router.delete('/:id', authMiddleware, deleteMealPlan);

export default router;

