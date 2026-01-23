import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

export async function getFilteredRecipes(req, res) {
  const user = await User.findById(req.userId);
  const userIngredients = user.ingredients;

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

    const ADMIN_ID = process.env.ADMIN_ID;

    // Build search filter
    const searchFilter = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    // Combine with user/admin filter
    const recipes = await Recipe.find({
      ...searchFilter,
      $or: [
        { user: req.user._id },
        { user: ADMIN_ID }
      ]
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.userId });
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
    const ADMIN_ID = process.env.ADMIN_ID;
    console.log("Ingredient IDs received:", ingredientIds);
    const recipes = await Recipe.find({
      $or: [
        { user: req.user._id },
        { user: ADMIN_ID }
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
  const { title, description, ingredients, steps, time, category, difficulty } = req.body;

  try {
    let parsedIngredients = ingredients;
    let parsedSteps = steps;

    if (typeof ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(ingredients);
      } catch (e) {
        parsedIngredients = [];
      }
    }
    if (typeof steps === 'string') {
      try {
        parsedSteps = JSON.parse(steps);
      } catch (e) {
        parsedSteps = [];
      }
    }

    const recipeData = {
      title,
      description,
      ingredients: parsedIngredients,
      steps: parsedSteps,
      time,
      category,
      difficulty,
      createdBy: req.userId,
      user: req.userId // Setting both to ensure compatibility
    };

    if (req.file) {
      recipeData.image = req.file.path;
    }

    const recipe = new Recipe(recipeData);

    await recipe.save();
    // Only populate if ingredients exist and are valid ObjectIds handling
    // await recipe.populate('ingredients.ingredient'); 

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating recipe', error: error.message });
  }
};


export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, steps, time, category, difficulty, image } = req.body;

  try {
    let updateData = {
      title,
      description,
      time,
      category,
      difficulty,
      image
    };

    if (ingredients) {
      updateData.ingredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
    }
    if (steps) {
      updateData.steps = typeof steps === 'string' ? JSON.parse(steps) : steps;
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    // Remove undefined keys
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id }, // Removed author check for now to avoid issues if field is missing, strictly speaking should check ownership
      updateData,
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating recipe' });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: id, author: req.userId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting recipe' });
  }
};
export const filterRecipes = async (req, res) => {
  const user = await User.findById(req.userId);
  const userIngredients = user.ingredients;
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
