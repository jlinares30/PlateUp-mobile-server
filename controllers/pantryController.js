import User from '../models/User.js';

// Get user's pantry
export const getPantry = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('pantry.ingredient');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.pantry);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pantry', error: error.message });
    }
};

// Add item to pantry
export const addToPantry = async (req, res) => {
    const { ingredientId, quantity, unit } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if ingredient already exists in pantry
        const existingItemIndex = user.pantry.findIndex(
            (item) => item.ingredient.toString() === ingredientId
        );

        if (existingItemIndex > -1) {
            // Update quantity if exists
            user.pantry[existingItemIndex].quantity += Number(quantity);
        } else {
            // Add new item
            user.pantry.push({ ingredient: ingredientId, quantity, unit });
        }

        await user.save();

        // Return the updated pantry with populated ingredients
        const updatedUser = await User.findById(req.user.id).populate('pantry.ingredient');
        res.status(201).json(updatedUser.pantry);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to pantry', error: error.message });
    }
};

// Update pantry item
export const updatePantryItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity, unit } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const item = user.pantry.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in pantry' });
        }

        if (quantity !== undefined) item.quantity = quantity;
        if (unit !== undefined) item.unit = unit;

        await user.save();

        // Return updated pantry
        const updatedUser = await User.findById(req.user.id).populate('pantry.ingredient');
        res.json(updatedUser.pantry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating pantry item', error: error.message });
    }
};

// Remove item from pantry
export const removeFromPantry = async (req, res) => {
    const { itemId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.pantry.pull(itemId);
        await user.save();

        res.json({ message: 'Item removed from pantry', pantry: user.pantry });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from pantry', error: error.message });
    }
};
