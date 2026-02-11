import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: String,
  imagePublicId: String,

  pantry: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      // quantity: Number,
      unit: String,
      stockLevel: {
        type: String,
        enum: ['FULL', 'MEDIUM', 'LOW', 'OUT'],
        default: 'FULL'
      }
    }
  ],

  shoppingList: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String,
      checked: { type: Boolean, default: false },
      contributors: [
        {
          recipeTitle: String,
          quantity: Number,
          unit: String
        }
      ]
    }
  ],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
}, { timestamps: true });

export default model('User', userSchema);
