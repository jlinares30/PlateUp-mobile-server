import User from '../models/User.js';

// Get user's shopping list
export const getShoppingList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('shoppingList.ingredient');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.shoppingList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shopping list', error: error.message });
    }
};

// Add item to shopping list
export const addToShoppingList = async (req, res) => {
    const { ingredientId, quantity, unit, checked } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if ingredient already exists in shopping list
        const existingItemIndex = user.shoppingList.findIndex(
            (item) => item.ingredient.toString() === ingredientId
        );

        if (existingItemIndex > -1) {
            // Update quantity if exists
            user.shoppingList[existingItemIndex].quantity += Number(quantity);
        } else {
            // Add new item
            user.shoppingList.push({ ingredient: ingredientId, quantity, unit, checked: !!checked });
        }

        await user.save();

        // Return the updated shopping list with populated ingredients
        const updatedUser = await User.findById(req.user.id).populate('shoppingList.ingredient');
        res.status(201).json(updatedUser.shoppingList);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to shopping list', error: error.message });
    }
};

// Update shopping list item (e.g. toggle checked status)
export const updateShoppingListItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity, unit, checked } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const item = user.shoppingList.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in shopping list' });
        }

        if (quantity !== undefined) item.quantity = quantity;
        if (unit !== undefined) item.unit = unit;
        if (checked !== undefined) item.checked = checked;

        await user.save();

        // Return updated shopping list
        const updatedUser = await User.findById(req.user.id).populate('shoppingList.ingredient');
        res.json(updatedUser.shoppingList);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shopping list item', error: error.message });
    }
};

// Remove item from shopping list
export const removeFromShoppingList = async (req, res) => {
    const { itemId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.shoppingList.pull(itemId);
        await user.save();

        res.json({ message: 'Item removed from shopping list', shoppingList: user.shoppingList });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from shopping list', error: error.message });
    }
};
