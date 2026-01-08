import { Schema, model } from 'mongoose';

const mealPlanSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  isActive: { type: Boolean, default: true },
  isPublic: { type: Boolean, default: false },

  days: [
    {
      day: { type: String, required: true },
      meals: [
        {
          type: { type: String, enum: ["desayuno", "almuerzo", "cena", "snack"] },
          recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
        }
      ]
    }
  ]
}, { timestamps: true });

export default model('MealPlan', mealPlanSchema);
