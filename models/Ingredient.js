import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: String,
  unit: String,
  image: String,
  imagePublicId: String,
  calories: Number,
  macros: {
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
  },
  tags: [String],
  isPublic: { type: Boolean, default: false },
  isSystem: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Ingredient', ingredientSchema);
