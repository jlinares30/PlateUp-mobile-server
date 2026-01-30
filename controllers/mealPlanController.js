import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import MealPlan from "../models/MealPlan.js";
import logger from '../config/logger.js';

// Helper to format plan (map user to owner)
const formatPlan = (plan) => {
  const p = plan.toObject ? plan.toObject() : plan;

  const userId = p.user?._id || p.user;
  return {
    ...p,
    owner: p.user, // Map user to owner for frontend compatibility
    ownerId: String(userId), // Ensure ownerId is available
    daysCount: p.days?.length || 0
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
    const mealPlans = await MealPlan.find({ user: req.user._id })
      .populate('days.meals.recipe', 'title')
      .populate('user', 'name email _id')
      .sort({ createdAt: -1 });

    const formatted = mealPlans.map(formatPlan);
    res.status(200).json({ data: formatted });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching my meal plans', error });
  }
};

export const getMealPlanById = async (req, res) => {
  try {
    const { id } = req.params;
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
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    res.status(500).json({ message: "Error fetching meal plan", error: error.message });
  }
};


export const createMealPlan = async (req, res) => {
  try {
    // Parse FormData fields if they come as strings
    if (req.body.days && typeof req.body.days === 'string') {
      try {
        req.body.days = JSON.parse(req.body.days);
      } catch (e) {
        return res.status(400).json({ message: "Invalid format for days" });
      }
    }
    if (req.body.isActive === 'true') req.body.isActive = true;
    if (req.body.isActive === 'false') req.body.isActive = false;
    if (req.body.isPublic === 'true') req.body.isPublic = true;
    if (req.body.isPublic === 'false') req.body.isPublic = false;

    const { title, description, days } = req.body;

    let imagePath = null;
    let imagePublicId = null;
    if (req.file) {
      logger.info("🚀 Iniciando subida a Cloudinary:", req.file.path);
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: 'meal_plans_app',
          folder: 'mealplans',
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: 35 },
            { fetch_format: "auto" }
          ]
        });
        imagePath = result.secure_url;
        imagePublicId = result.public_id;
        logger.info("✅ Subida exitosa:", imagePath);

        fs.unlinkSync(req.file.path); // Borra el archivo de /uploads
        logger.info("🗑️ Archivo local eliminado");
      } catch (uploadError) {
        logger.error("❌ Error subiendo a Cloudinary:", uploadError);
        // Si falla, intentamos borrar el local por si acaso
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(500).json({ message: "Error al subir imagen", error: uploadError.message });
      }
    }

    const newMealPlan = new MealPlan({
      user: req.user._id,
      title,
      description,
      image: imagePath,
      imagePublicId,
      days
    });

    const savedPlan = await newMealPlan.save();
    await savedPlan.populate('days.meals.recipe.title');
    // also populate user for consistency in return
    await savedPlan.populate('user', 'name email _id');

    const response = formatPlan(savedPlan);
    res.status(201).json(response);
  } catch (error) {
    logger.error("Error creating meal plan:", error);
    // Clean up file if it exists and wasn't processed
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) { }
    }
    res.status(500).json({ message: 'Error creando el meal plan', error });
  }
};

export const cloneMealPlan = async (req, res) => {
  try {
    const { id } = req.body; // ID of the plan to clone
    if (!id) return res.status(400).json({ message: "ID parameter required" });

    const originalPlan = await MealPlan.findById(id);
    if (!originalPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Create new plan copy
    const newPlan = new MealPlan({
      user: req.user._id,
      title: originalPlan.title,
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
    res.status(201).json({ data: response });
  } catch (error) {
    logger.error("Clone error:", error);
    res.status(500).json({ message: "Error cloning meal plan", error: error.message });
  }
};

export const updateMealPlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Parse FormData fields if they come as strings
    if (req.body.days && typeof req.body.days === 'string') {
      try {
        req.body.days = JSON.parse(req.body.days);
      } catch (e) {
        return res.status(400).json({ message: "Invalid format for days" });
      }
    }
    if (req.body.isActive === 'true') req.body.isActive = true;
    if (req.body.isActive === 'false') req.body.isActive = false;
    if (req.body.isPublic === 'true') req.body.isPublic = true;
    if (req.body.isPublic === 'false') req.body.isPublic = false;

    const { title, description, isActive, days } = req.body;

    const updateData = { title, description, isActive, days };

    if (req.file) {
      logger.info("🚀 Iniciando subida a Cloudinary (Update):", req.file.path);
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: 'meal_plans_app',
          folder: 'mealplans',
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: 35 },
            { fetch_format: "auto" }
          ]
        });
        updateData.image = result.secure_url;
        updateData.imagePublicId = result.public_id;
        logger.info("✅ Subida exitosa:", updateData.image);

        // Delete old image
        const oldPlan = await MealPlan.findById(id);
        if (oldPlan && oldPlan.imagePublicId) {
          cloudinary.uploader.destroy(oldPlan.imagePublicId);
        }

        fs.unlinkSync(req.file.path);
        logger.info("🗑️ Archivo local eliminado");
      } catch (uploadError) {
        logger.error("❌ Error subiendo a Cloudinary:", uploadError);
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(500).json({ message: "Error al subir imagen", error: uploadError.message });
      }
    }

    const mealPlan = await MealPlan.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updateData,
      { new: true }
    ).populate('user', 'name email _id')
      .populate('days.meals.recipe', 'title');

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.status(200).json(formatPlan(mealPlan));
  } catch (error) {
    logger.error("Error updating meal plan:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) { }
    }
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

    if (mealPlan.imagePublicId) {
      cloudinary.uploader.destroy(mealPlan.imagePublicId);
    }

    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal plan', error });
  }
};

