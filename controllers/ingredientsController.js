import Ingredient from '../models/Ingredient.js'

export const getAllIngredients = async (req, res) => {
    try {
        const { query } = req.query;

        const filter = query
            ? { name: { $regex: query, $options: "i" } }
            : {};

        const ingredients = await Ingredient.find(filter);
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
        const ingredientData = { ...req.body };
        if (req.file) {
            ingredientData.image = req.file.path;
        }

        const newIngredient = new Ingredient(ingredientData);
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating ingredient' })
    }
}