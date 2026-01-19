import { Router } from 'express';
import { getShoppingList, addToShoppingList, updateShoppingListItem, removeFromShoppingList } from '../controllers/shoppingListController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // Protect all shopping list routes

router.get('/', getShoppingList);
router.post('/', addToShoppingList);
router.put('/:itemId', updateShoppingListItem);
router.delete('/:itemId', removeFromShoppingList);

export default router;
