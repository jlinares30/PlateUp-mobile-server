import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class RecipeIngredient {
  @Prop({ type: Types.ObjectId, ref: 'Ingredient', required: true })
  ingredient: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit: string;
}

const RecipeIngredientSchema = SchemaFactory.createForClass(RecipeIngredient);

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  difficulty?: string;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: false })
  isSystem: boolean;

  @Prop({ type: [RecipeIngredientSchema], default: [] })
  ingredients: RecipeIngredient[];

  @Prop({ type: [String], default: [] })
  steps: string[];

  @Prop({ required: true })
  time: string;

  @Prop()
  image?: string;

  @Prop()
  imagePublicId?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
