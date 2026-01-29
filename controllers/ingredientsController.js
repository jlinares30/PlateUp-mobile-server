import Ingredient from '../models/Ingredient.js'
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const getAllIngredients = async (req, res) => {
    try {
        const { query } = req.query;

        const baseFilter = {
            $or: [
                { isSystem: true },
                { isPublic: true },
                { user: req.user._id }
            ]
        };

        const searchFilter = query
            ? { name: { $regex: query, $options: "i" } }
            : {};

        const finalFilter = { ...baseFilter, ...searchFilter };

        const ingredients = await Ingredient.find(finalFilter);
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ingredients' })
    }
}

export const getIngredientById = async (req, res) => {
    const { id } = req.params;
    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ingredient', error });
    }
};


export const createIngredient = async (req, res) => {
    try {
        let imageUrl = null;
        let imagePublicId = null;
        if (req.file) {
            console.log("🚀 Iniciando subida a Cloudinary:", req.file.path);
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: 'meal_plans_app',
                folder: 'ingredients',
                transformation: [
                    { width: 800, height: 800, crop: "limit" },
                    { quality: 35 },
                    { fetch_format: "auto" }
                ]
            });
            console.log("✅ Subida exitosa:", result.secure_url);
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
            fs.unlinkSync(req.file.path);
        }

        const ingredientData = {
            ...req.body,
            user: req.user._id
        };

        if (imageUrl) {
            ingredientData.image = imageUrl;
            ingredientData.imagePublicId = imagePublicId;
        }

        // Parse complex fields if they are strings (from FormData)
        if (typeof ingredientData.macros === 'string') {
            try {
                ingredientData.macros = JSON.parse(ingredientData.macros);
            } catch (e) {
                console.error("Error parsing macros:", e);
            }
        }

        if (typeof ingredientData.tags === 'string') {
            try {
                ingredientData.tags = JSON.parse(ingredientData.tags);
            } catch (e) {
                console.error("Error parsing tags:", e);
            }
        }

        // Handle booleans
        if (req.body.isPublic !== undefined) {
            ingredientData.isPublic = req.body.isPublic === 'true' || req.body.isPublic === true;
        }
        if (req.body.isSystem !== undefined) {
            ingredientData.isSystem = req.body.isSystem === 'true' || req.body.isSystem === true;
        }


        const newIngredient = new Ingredient(ingredientData);
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    }
    catch (error) {
        console.error("Error creating ingredient:", error);
        // Clean up file if error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error creating ingredient', error: error.message })
    }
}

export const updateIngredient = async (req, res) => {
    const { id } = req.params;
    try {
        const updateData = { ...req.body };

        if (req.file) {
            console.log("🚀 Iniciando subida a Cloudinary (update):", req.file.path);
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: 'meal_plans_app',
                folder: 'ingredients',
                transformation: [
                    { width: 800, height: 800, crop: "limit" },
                    { quality: 35 },
                    { fetch_format: "auto" }
                ]
            });
            updateData.image = result.secure_url;
            updateData.imagePublicId = result.public_id;

            // Delete old image
            const oldIngredient = await Ingredient.findById(id);
            if (oldIngredient && oldIngredient.imagePublicId) {
                cloudinary.uploader.destroy(oldIngredient.imagePublicId);
            }

            fs.unlinkSync(req.file.path);
        }

        // Parse complex fields
        if (typeof updateData.macros === 'string') {
            try {
                updateData.macros = JSON.parse(updateData.macros);
            } catch (e) {
                // ignore or log
            }
        }
        if (typeof updateData.tags === 'string') {
            try {
                updateData.tags = JSON.parse(updateData.tags);
            } catch (e) {
                // ignore
            }
        }

        // Handle booleans
        if (updateData.isPublic !== undefined) {
            updateData.isPublic = updateData.isPublic === 'true' || updateData.isPublic === true;
        }
        if (updateData.isSystem !== undefined) {
            updateData.isSystem = updateData.isSystem === 'true' || updateData.isSystem === true;
        }

        const updatedIngredient = await Ingredient.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json(updatedIngredient);
    } catch (error) {
        console.error("Error updating ingredient:", error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error updating ingredient' });
    }
};

export const deleteIngredient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIngredient = await Ingredient.findByIdAndDelete(id);
        if (!deletedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        if (deletedIngredient.imagePublicId) {
            cloudinary.uploader.destroy(deletedIngredient.imagePublicId);
        }

        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ingredient' });
    }
};