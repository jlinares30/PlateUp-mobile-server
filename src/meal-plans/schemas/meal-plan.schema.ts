import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MealPlanDocument = MealPlan & Document;

export enum MealType {
  DESAYUNO = 'desayuno',
  ALMUERZO = 'almuerzo',
  CENA = 'cena',
  SNACK = 'snack',
}

@Schema()
export class Meal {
  @Prop({ type: String, enum: MealType, required: true })
  type: MealType;

  @Prop({ type: Types.ObjectId, ref: 'Recipe', required: true })
  recipe: Types.ObjectId;
}

const MealSchema = SchemaFactory.createForClass(Meal);

@Schema()
export class MealPlanDay {
  @Prop({ required: true })
  day: string;

  @Prop({ type: [MealSchema], default: [] })
  meals: Meal[];
}

const MealPlanDaySchema = SchemaFactory.createForClass(MealPlanDay);

@Schema({ timestamps: true })
export class MealPlan {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop()
  imagePublicId?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: false })
  isSystem: boolean;

  @Prop({ type: [MealPlanDaySchema], default: [] })
  days: MealPlanDay[];
}

export const MealPlanSchema = SchemaFactory.createForClass(MealPlan);
