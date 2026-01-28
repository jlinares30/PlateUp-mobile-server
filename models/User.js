import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: String,

  pantry: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String
    }
  ],

  shoppingList: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String,
      checked: { type: Boolean, default: false }
    }
  ],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

export default model('User', userSchema);
