import MealPlan from '../models/MealPlan.js';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import logger from '../config/logger.js';

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Count total recipes
        const recipesCount = await Recipe.countDocuments({ isPublic: true, isSystem: true });

        // 2. Count meal plans created by the user (or active ones?)
        const plansCount = await MealPlan.countDocuments({ isPublic: true, isSystem: true });

        // 3. Count favorites
        const user = await User.findById(userId);
        const favoritesCount = user.favorites ? user.favorites.length : 0;

        res.json({
            success: true,
            data: {
                recipesCount,
                plansCount,
                favoritesCount
            }
        });
    } catch (error) {
        logger.error("Error fetching stats:", error);
        res.status(500).json({ success: false, message: "Error loading stats" });
    }
};
