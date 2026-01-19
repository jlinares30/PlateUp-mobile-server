import { Router } from 'express';
import { getPantry, addToPantry, updatePantryItem, removeFromPantry } from '../controllers/pantryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // Protect all pantry routes

router.get('/', getPantry);
router.post('/', addToPantry);
router.put('/:itemId', updatePantryItem);
router.delete('/:itemId', removeFromPantry);

export default router;
