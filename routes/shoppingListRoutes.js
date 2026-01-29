import { Router } from 'express';
import { addToShoppingList, clearShoppingList, getShoppingList, removeFromShoppingList, updateShoppingListItem } from '../controllers/shoppingListController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // Protect all shopping list routes

router.get('/', getShoppingList);
router.post('/', addToShoppingList);
router.delete('/clear', clearShoppingList); // Specific route first
router.put('/:itemId', updateShoppingListItem);
router.delete('/:itemId', removeFromShoppingList); // Parameter route last

export default router;
