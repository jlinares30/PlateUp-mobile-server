import MealPlan from "../models/MealPlan.js";

// Helper to format plan (map user to owner)
const formatPlan = (plan) => {
  const p = plan.toObject ? plan.toObject() : plan;
  return {
    ...p,
    owner: p.user, // Map user to owner for frontend compatibility
    ownerId: p.user?._id || p.user // Ensure ownerId is available
  };
};

export const getMealPlans = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    let filter = {
      user: { $ne: userId }, // Exclude my own plans  
      $or: [
        { isSystem: true },
        { isPublic: true }
      ]
    };

    const mealPlans = await MealPlan.find(filter)
      .populate('days.meals.recipe', 'title')
      .populate('user', 'name email _id')
      .sort({ createdAt: -1 });

    const formatted = mealPlans.map(formatPlan);
    res.status(200).json({ data: formatted });
  } catch (error) {
    res.status(500).json({ message: 'Error', error });
  }
};

export const getMyMealPlans = async (req, res) => {
  try {
    console.log("GET /meal-plans/my Request - User:", req.user?._id);
    const mealPlans = await MealPlan.find({ user: req.user._id })
      .populate('days.meals.recipe', 'title')
      .populate('user', 'name email _id')
      .sort({ createdAt: -1 });

    const formatted = mealPlans.map(formatPlan);
    console.log(`GET /meal-plans/my Response - Found ${formatted.length} plans`);
    res.status(200).json({ data: formatted });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching my meal plans', error });
  }
};

export const getMealPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("GET /meal-plans/:id Request - ID:", id, "User:", req.user?._id);
    if (!req.user?._id) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const { _id: userId } = req.user;

    const mealPlan = await MealPlan.findOne({
      _id: id,
      $or: [
        { user: userId },
        { isSystem: true },
      ]
    }).populate("days.meals.recipe", "_id title imageUrl")
      .populate('user', 'name email _id');

    if (!mealPlan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }
    const response = formatPlan(mealPlan);
    console.log("GET /meal-plans/:id Response - Data:", JSON.stringify(response, null, 2));
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    res.status(500).json({ message: "Error fetching meal plan", error: error.message });
  }
};


export const createMealPlan = async (req, res) => {
  try {
    const { title, description, days } = req.body;
    console.log("POST /meal-plans Request - Body:", JSON.stringify(req.body, null, 2));
    const newMealPlan = new MealPlan({
      user: req.user._id,
      title,
      description,
      days
    });

    const savedPlan = await newMealPlan.save();
    await savedPlan.populate('days.meals.recipe.title');
    // also populate user for consistency in return
    await savedPlan.populate('user', 'name email _id');

    const response = formatPlan(savedPlan);
    console.log("POST /meal-plans Response - Created ID:", savedPlan._id);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error creando el meal plan', error });
  }
};

export const cloneMealPlan = async (req, res) => {
  try {
    const { id } = req.body; // ID of the plan to clone
    console.log("POST /meal-plans/clone Request - ID to clone:", id, "User:", req.user?._id);
    if (!id) return res.status(400).json({ message: "ID parameter required" });

    const originalPlan = await MealPlan.findById(id);
    if (!originalPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Create new plan copy
    const newPlan = new MealPlan({
      user: req.user._id,
      title: `${originalPlan.title} (Copia)`,
      description: originalPlan.description,
      days: originalPlan.days,
      isActive: true
    });

    const savedPlan = await newPlan.save();

    // Re-fetch to ensure population matches exactly what fetch endpoints return
    const finalPlan = await MealPlan.findById(savedPlan._id)
      .populate('user', 'name email _id')
      .populate('days.meals.recipe', 'title');

    const response = formatPlan(finalPlan);
    console.log("POST /meal-plans/clone Response - New Plan ID:", finalPlan._id, "Owner:", response.owner);
    res.status(201).json({ data: response });
  } catch (error) {
    console.error("Clone error:", error);
    res.status(500).json({ message: "Error cloning meal plan", error: error.message });
  }
};

export const updateMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isActive, days } = req.body;
    console.log("PUT /meal-plans/:id Request - ID:", id, "Body:", JSON.stringify(req.body, null, 2));
    const mealPlan = await MealPlan.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, isActive, days },
      { new: true }
    ).populate('user', 'name email _id');

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.status(200).json(formatPlan(mealPlan));
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal plan', error });
  }
};

export const deleteMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const mealPlan = await MealPlan.findOneAndDelete({ _id: id, user: req.user._id });
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal plan', error });
  }
};

