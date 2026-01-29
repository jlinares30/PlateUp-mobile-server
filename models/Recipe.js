import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  difficulty: String,
  isPublic: { type: Boolean, default: false },
  isSystem: { type: Boolean, default: false },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number
    }
  ],

  steps: [String],
  time: { type: String, required: true },
  image: { type: String },
  tags: [String],
});

export default model('Recipe', recipeSchema);
