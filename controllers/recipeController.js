import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import Recipe from '../models/Recipe.js';

export async function getFilteredRecipes(req, res) {
  // Use req.user set by middleware
  const userIngredients = req.user.ingredients;

  const recipes = await Recipe.find();

  const filtered = recipes.filter(recipe =>
    recipe.ingredients.every(ingredient =>
      userIngredients.includes(ingredient)
    )
  );

  res.json(filtered);
}

export const getRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    if (!req.user?._id) {
      return res.status(401).json({ message: "No autorizado" });
    }
    // Build search filter
    const searchFilter = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    // Combine with user/admin filter
    const recipes = await Recipe.find({
      ...searchFilter,
      $or: [
        { isSystem: true },
        { isPublic: true }
      ]
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your recipes' });
  }
};
export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id).populate('ingredients.ingredient');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe' });
  }
};

export const getRecipesByIngredients = async (req, res) => {
  try {
    // list of selected ingredient IDs
    const { ingredientIds } = req.body;
    console.log("Ingredient IDs received:", ingredientIds);
    const recipes = await Recipe.find({
      $or: [
        { isSystem: true },
        { isPublic: true },
        { user: req.user._id }
      ]
    }).populate("ingredients");
    const results = recipes.map((recipe) => {
      //const recipeIngredientIds = recipe.ingredients.map((ing) => ing._id.toString());
      const recipeIngredientIds = recipe.ingredients.map((ing) => ing.ingredient.toString());
      const matches = recipeIngredientIds.filter((id) =>
        ingredientIds.includes(id)
      );

      const matchPercentage =
        recipeIngredientIds.length > 0
          ? Math.round((matches.length / recipeIngredientIds.length) * 100)
          : 0;

      return {
        ...recipe.toObject(),
        matchPercentage,
      };
    });

    // Ordenar por porcentaje de coincidencia (de mayor a menor)
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    let imageUrl = null;

    // PASO 1: Subida manual a Cloudinary si hay archivo
    if (req.file) {
      console.log("🚀 Iniciando subida a Cloudinary:", req.file.path);
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'meal_plans_app',
        folder: 'recipes'
      });
      console.log("✅ Subida exitosa:", result.secure_url);
      imageUrl = result.secure_url;

      // Borrar archivo local
      fs.unlinkSync(req.file.path);
      console.log("🗑️ Archivo local eliminado");
    }

    // PASO 2: Preparar datos para MongoDB
    const recipeData = {
      ...req.body,
      ingredients: JSON.parse(req.body.ingredients),
      steps: JSON.parse(req.body.steps),
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      user: req.user._id,
      isPublic: req.body.isPublic === 'true' || req.body.isPublic === true
    };

    if (imageUrl) {
      recipeData.image = imageUrl;
    }

    // PASO 3: Guardar en DB
    const recipe = new Recipe(recipeData);
    await recipe.save();
    console.log("✅ Receta guardada en DB");

    res.status(201).json(recipe);
  } catch (error) {
    console.error("❌ Error en el proceso:", error);
    // Intentar borrar archivo local si hubo error y el archivo existe
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("🗑️ Archivo local eliminado tras error");
      } catch (unlinkError) {
        console.error("Error eliminando archivo local:", unlinkError);
      }
    }
    res.status(500).json({ message: "Error al procesar imagen o receta", error: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, steps, time, category, difficulty, image, tags } = req.body;

  try {
    const updateData = {
      title,
      description,
      time,
      category,
      difficulty,
      image,
      isPublic: req.body.isPublic === 'true' || req.body.isPublic === true
    };

    if (ingredients) {
      updateData.ingredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
    }
    if (steps) {
      updateData.steps = typeof steps === 'string' ? JSON.parse(steps) : steps;
    }
    if (tags) {
      updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    // Handle Image Upload if new file is provided
    if (req.file) {
      console.log("🚀 Iniciando subida de actualización a Cloudinary:", req.file.path);
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: 'meal_plans_app'
        });
        console.log("✅ Subida exitosa (update):", result.secure_url);
        updateData.image = result.secure_url;

        // Delete local file
        fs.unlinkSync(req.file.path);
        console.log("🗑️ Archivo local eliminado (update)");
      } catch (uploadError) {
        console.error("❌ Error subiendo a Cloudinary:", uploadError);
        // Clean up local file even explicitly if it failed
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    // Remove undefined keys
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, user: req.user._id }, // Ensure ownership
      updateData,
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    // Clean up local file if global error occurred and file exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ message: 'Error updating recipe' });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: id, user: req.user._id });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting recipe' });
  }
};
export const filterRecipes = async (req, res) => {
  // Use req.user set by middleware
  const userIngredients = req.user.ingredients;
  try {
    const recipes = await Recipe.find();
    const filtered = recipes.filter(recipe =>
      recipe.ingredients.every(ingredient =>
        userIngredients.includes(ingredient)
      )
    );
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering recipes' });
  }
};


export const getFavorites = async (req, res) => {
  try {
    // req.user is loaded by middleware
    const favorites = req.user.favorites;
    const recipes = await Recipe.find({ _id: { $in: favorites } });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

export const toggleFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if recipe exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (user.favorites.includes(id)) {
      user.favorites.pull(id);
    } else {
      user.favorites.push(id);
    }
    await user.save();

    // Return the new status to the client
    res.status(200).json({
      message: 'Favorite toggled successfully',
      isFavorite: user.favorites.includes(id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error toggling favorite' });
  }
};
